import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetLocation } from "@/hooks/useQueries";
import { formatTimestamp } from "@/utils/formatters";
import {
  AlertCircle,
  Clock,
  Loader2,
  MapPin,
  Phone,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MapEmbed } from "./MapEmbed";

export function FindLocationSection() {
  const [searchPhone, setSearchPhone] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState<string | null>(null);

  const { data: location, isLoading, isError } = useGetLocation(submittedPhone);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchPhone.trim()) setSubmittedPhone(searchPhone.trim());
  };

  return (
    <section id="find-location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-icon-tile text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Find Location
          </span>
          <h2 className="text-3xl font-bold text-foreground">
            Locate a Phone Number
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Enter a phone number below to view their shared location on the map.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <Input
              type="tel"
              placeholder="Enter phone number to locate..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="flex-1 h-12 bg-background"
              data-ocid="find_location.input"
            />
            <Button
              type="submit"
              className="h-12 px-6 bg-primary text-white hover:bg-primary/90"
              disabled={!searchPhone.trim() || isLoading}
              data-ocid="find_location.primary_button"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3 py-12 text-muted-foreground"
                data-ocid="find_location.loading_state"
              >
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span>Searching for location...</span>
              </motion.div>
            )}

            {isError && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 bg-destructive/10 text-destructive rounded-xl p-4"
                data-ocid="find_location.error_state"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">
                  Failed to fetch location. Please try again.
                </span>
              </motion.div>
            )}

            {!isLoading && submittedPhone && location === null && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
                data-ocid="find_location.empty_state"
              >
                <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  No location found for this number.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ask them to share their location first.
                </p>
              </motion.div>
            )}

            {!isLoading && location && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                data-ocid="find_location.success_state"
              >
                <Card className="shadow-card overflow-hidden">
                  <CardHeader className="bg-background border-b border-border pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Location Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <MapEmbed
                      lat={location.lat}
                      lng={location.lng}
                      height="320px"
                    />
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Phone
                          </div>
                          <div className="font-medium text-foreground">
                            {submittedPhone}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Label
                          </div>
                          <div className="font-medium text-foreground">
                            {location.locationLabel || "No label"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm col-span-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Last Updated
                          </div>
                          <div className="font-medium text-foreground">
                            {formatTimestamp(location.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-xs text-muted-foreground bg-background rounded-lg p-2">
                        Coordinates: {location.lat.toFixed(6)},{" "}
                        {location.lng.toFixed(6)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
