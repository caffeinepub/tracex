import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useListLocations } from "@/hooks/useQueries";
import { timeAgo } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, MapPin, RefreshCw, Users } from "lucide-react";
import { useState } from "react";
import { MapEmbed } from "./MapEmbed";

export function LiveMapSection() {
  const { data: locations = [], isLoading } = useListLocations();
  const queryClient = useQueryClient();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selected = locations[selectedIdx] ?? null;

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["locations"] });
  };

  return (
    <section id="live-map" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-block bg-icon-tile text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2">
              Live Map
            </span>
            <h2 className="text-3xl font-bold text-foreground">
              Active Connections
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <Card className="shadow-card overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Left panel */}
              <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-border p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Connected Devices
                  </span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {locations.length}
                  </Badge>
                </div>

                {isLoading ? (
                  <div
                    className="flex items-center gap-2 text-muted-foreground text-sm py-4"
                    data-ocid="live_map.loading_state"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                ) : locations.length === 0 ? (
                  <div
                    className="text-center py-8"
                    data-ocid="live_map.empty_state"
                  >
                    <MapPin className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No active connections
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {locations.map((loc, i) => (
                      <button
                        // biome-ignore lint/suspicious/noArrayIndexKey: stable positional index
                        key={i}
                        type="button"
                        onClick={() => setSelectedIdx(i)}
                        data-ocid={`live_map.item.${i + 1}`}
                        className={`w-full text-left p-3 rounded-xl transition-colors ${
                          selectedIdx === i
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-secondary border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                          <span className="text-sm font-medium text-foreground truncate">
                            {loc.locationLabel || `Device ${i + 1}`}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 ml-4">
                          {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)} ·{" "}
                          {timeAgo(loc.timestamp)}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="flex-1">
                {selected ? (
                  <MapEmbed
                    lat={selected.lat}
                    lng={selected.lng}
                    height="480px"
                    className="rounded-none border-0"
                  />
                ) : (
                  <div className="h-80 md:h-[480px] flex flex-col items-center justify-center bg-background text-muted-foreground">
                    <MapPin className="h-12 w-12 text-muted-foreground/20 mb-3" />
                    <p className="text-sm">Select a device to view on map</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
