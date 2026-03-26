import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Shield, Signal, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface HeroSectionProps {
  onLocate: (phone: string) => void;
}

export function HeroSection({ onLocate }: HeroSectionProps) {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) onLocate(phone.trim());
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.96_0.04_230)] to-[oklch(0.97_0.02_245)] py-20 md:py-28"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="oklch(0.58 0.18 253)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Signal className="h-3 w-3" />
              Real-time Location Tracking
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
              Track Any Location
              <span className="text-primary"> by Phone Number</span>
            </h1>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Instantly locate any device on an interactive map. Share your own
              location securely and see real-time updates across your connected
              network.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex gap-3 flex-col sm:flex-row"
            >
              <Input
                type="tel"
                placeholder="Enter phone number..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 h-12 text-base bg-white border-border shadow-xs"
                data-ocid="hero.input"
              />
              <Button
                type="submit"
                className="h-12 px-8 bg-primary text-white hover:bg-primary/90 font-semibold"
                data-ocid="hero.primary_button"
                disabled={!phone.trim()}
              >
                Locate Now
              </Button>
            </form>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="w-56 h-96 bg-foreground rounded-[2.5rem] p-3 shadow-2xl relative">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="bg-primary h-10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                    <span className="text-white text-xs ml-1 font-semibold">
                      TraceX
                    </span>
                  </div>
                  {/* Map area */}
                  <div className="flex-1 bg-[oklch(0.94_0.04_230)] relative overflow-hidden">
                    {/* Fake map tiles */}
                    <svg
                      width="100%"
                      height="100%"
                      className="opacity-30"
                      aria-hidden="true"
                    >
                      <line
                        x1="0"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        stroke="#2F80ED"
                        strokeWidth="1"
                      />
                      <line
                        x1="50%"
                        y1="0"
                        x2="50%"
                        y2="100%"
                        stroke="#2F80ED"
                        strokeWidth="1"
                      />
                      <line
                        x1="0"
                        y1="30%"
                        x2="100%"
                        y2="70%"
                        stroke="#2F80ED"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="0"
                        y1="70%"
                        x2="100%"
                        y2="30%"
                        stroke="#2F80ED"
                        strokeWidth="0.5"
                      />
                    </svg>
                    {/* Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-primary rounded-full p-2 shadow-lg">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div className="w-2 h-2 bg-primary rounded-full mx-auto -mt-0.5" />
                    </div>
                    {/* Pulse rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 rounded-full border-2 border-primary/30 animate-ping" />
                    </div>
                  </div>
                  {/* Bottom info */}
                  <div className="p-3 bg-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-muted-foreground">
                        Live tracking active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-8 bg-white shadow-card rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Wifi className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">
                  Real-time Map
                </span>
              </motion.div>
              {/* Shield badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-8 bg-white shadow-card rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-xs font-semibold text-foreground">
                  Secure &amp; Private
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
