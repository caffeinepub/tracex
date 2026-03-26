import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShareLocation } from "@/hooks/useQueries";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  MapPin,
  Navigation,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const shareFeatures = [
  { icon: Navigation, text: "One-click GPS detection from your browser" },
  { icon: MapPin, text: "Location linked to your phone number" },
  { icon: CheckCircle, text: "Update or delete your location anytime" },
];

export function ShareLocationSection() {
  const [phone, setPhone] = useState("");
  const [label, setLabel] = useState("");
  const [geoState, setGeoState] = useState<
    "idle" | "fetching" | "success" | "error"
  >("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [submitted, setSubmitted] = useState(false);

  const { mutate: shareLocation, isPending } = useShareLocation();

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    setGeoState("fetching");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoState("success");
        toast.success("Location detected!");
      },
      () => {
        setGeoState("error");
        toast.error("Failed to get location. Please allow location access.");
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !coords) return;
    shareLocation(
      {
        phone: phone.trim(),
        lat: coords.lat,
        lng: coords.lng,
        label: label.trim() || "My Location",
      },
      {
        onSuccess: () => {
          toast.success("Location shared successfully!");
          setSubmitted(true);
        },
        onError: () => toast.error("Failed to share location. Try again."),
      },
    );
  };

  return (
    <section id="share-location" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-icon-tile text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Share Location
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Share Your Location
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Let others find you instantly by sharing your current GPS location
              linked to your phone number. You control when and what you share.
            </p>
            <div className="space-y-4">
              {shareFeatures.map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="bg-icon-tile rounded-lg p-2">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Share My Location</CardTitle>
                <CardDescription>
                  Enter your details and allow location access
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div
                    className="text-center py-8"
                    data-ocid="share_location.success_state"
                  >
                    <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-3" />
                    <p className="font-semibold text-foreground text-lg">
                      Location Shared!
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Others can now find you by your phone number.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => {
                        setPhone("");
                        setLabel("");
                        setCoords(null);
                        setGeoState("idle");
                        setSubmitted(false);
                      }}
                    >
                      Share Again
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="share-phone">Phone Number</Label>
                      <Input
                        id="share-phone"
                        type="tel"
                        placeholder="+1 555 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        data-ocid="share_location.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="share-label">
                        Location Label (optional)
                      </Label>
                      <Input
                        id="share-label"
                        type="text"
                        placeholder="e.g. Home, Office, Current..."
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        data-ocid="share_location.textarea"
                      />
                    </div>

                    {/* GPS detection */}
                    <div className="rounded-xl border border-border p-3 bg-background">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            Current GPS
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={getLocation}
                          disabled={geoState === "fetching"}
                          data-ocid="share_location.secondary_button"
                        >
                          {geoState === "fetching" ? (
                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                          ) : null}
                          {geoState === "success"
                            ? "Re-detect"
                            : "Get My Location"}
                        </Button>
                      </div>
                      {geoState === "success" && coords && (
                        <p className="text-xs text-muted-foreground mt-2">
                          ✓ {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                        </p>
                      )}
                      {geoState === "error" && (
                        <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Location access denied
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-primary text-white hover:bg-primary/90 font-semibold"
                      disabled={!phone.trim() || !coords || isPending}
                      data-ocid="share_location.submit_button"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Sharing...
                        </>
                      ) : (
                        "Share Location"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
