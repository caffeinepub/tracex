import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteLocation, useListLocations } from "@/hooks/useQueries";
import { formatTimestamp } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import {
  Clock,
  Loader2,
  MapPin,
  RefreshCw,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminSection() {
  const { data: locations = [], isLoading, isError } = useListLocations();
  const { mutate: deleteLocation, isPending: isDeleting } = useDeleteLocation();
  const queryClient = useQueryClient();
  const [deletePhone, setDeletePhone] = useState("");

  const handleDeleteByPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletePhone.trim()) return;
    deleteLocation(deletePhone.trim(), {
      onSuccess: () => {
        toast.success(`Location for ${deletePhone} deleted.`);
        setDeletePhone("");
      },
      onError: () => toast.error("Failed to delete location."),
    });
  };

  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: ["locations"] });

  return (
    <section id="admin" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-block bg-icon-tile text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Admin Dashboard
          </span>
          <h2 className="text-3xl font-bold text-foreground">
            Location Dashboard
          </h2>
          <p className="text-muted-foreground mt-2">
            Manage all shared locations and connections.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="bg-icon-tile rounded-xl p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {locations.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Connections
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="bg-icon-tile rounded-xl p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  Encrypted
                </div>
                <div className="text-sm text-muted-foreground">
                  Privacy Settings
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="bg-icon-tile rounded-xl p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">Full</div>
                <div className="text-sm text-muted-foreground">
                  Location History
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delete by phone */}
        <Card className="shadow-card mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-destructive" />
              Remove Location by Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDeleteByPhone} className="flex gap-3">
              <Input
                type="tel"
                placeholder="Enter phone number to remove..."
                value={deletePhone}
                onChange={(e) => setDeletePhone(e.target.value)}
                className="flex-1"
                data-ocid="admin.input"
              />
              <Button
                type="submit"
                variant="destructive"
                disabled={!deletePhone.trim() || isDeleting}
                data-ocid="admin.delete_button"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Remove
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-background border-b border-border">
            <CardTitle className="text-base">All Shared Locations</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={refresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div
                className="flex items-center justify-center gap-3 py-12 text-muted-foreground"
                data-ocid="admin.loading_state"
              >
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                Loading locations...
              </div>
            ) : isError ? (
              <div
                className="text-center py-12 text-destructive"
                data-ocid="admin.error_state"
              >
                Failed to load locations.
              </div>
            ) : locations.length === 0 ? (
              <div className="text-center py-12" data-ocid="admin.empty_state">
                <MapPin className="h-12 w-12 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No locations shared yet.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Use the Share Location section to add one.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto" data-ocid="admin.table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Label</TableHead>
                      <TableHead>Coordinates</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locations.map((loc, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: stable positional index
                      <TableRow key={i} data-ocid={`admin.row.${i + 1}`}>
                        <TableCell className="text-muted-foreground">
                          {i + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {loc.locationLabel || "No label"}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatTimestamp(loc.timestamp)}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                            Active
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
