import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Location } from "../backend.d";
import { useActor } from "./useActor";

export function useGetLocation(phone: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Location | null>({
    queryKey: ["location", phone],
    queryFn: async () => {
      if (!actor || !phone) return null;
      return actor.getLocation(phone);
    },
    enabled: !!actor && !isFetching && !!phone,
  });
}

export function useListLocations() {
  const { actor, isFetching } = useActor();
  return useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listLocations();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useShareLocation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      phone,
      lat,
      lng,
      label,
    }: {
      phone: string;
      lat: number;
      lng: number;
      label: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.shareLocation(phone, lat, lng, label);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}

export function useDeleteLocation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (phone: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteLocation(phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}

export type { Location };
