import { Bell, Clock, Globe, Lock, MapPin, Smartphone } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: MapPin,
    number: "01",
    title: "Precise GPS Tracking",
    description:
      "Get accurate real-time GPS coordinates for any registered phone number. See exact location on an interactive map with street-level detail.",
  },
  {
    icon: Lock,
    number: "02",
    title: "Privacy-First Design",
    description:
      "All location data is encrypted and shared only with explicit consent. Users fully control who can see their location and for how long.",
  },
  {
    icon: Clock,
    number: "03",
    title: "Location History",
    description:
      "Access timestamped location history for any connected device. Review past movements and replay routes with full timeline support.",
  },
  {
    icon: Smartphone,
    number: "04",
    title: "Cross-Device Sync",
    description:
      "Works seamlessly across iOS, Android, and web browsers. Share your location once and it stays in sync everywhere automatically.",
  },
  {
    icon: Globe,
    number: "05",
    title: "Global Coverage",
    description:
      "Track locations anywhere in the world. Our infrastructure supports real-time updates with millisecond latency from any country.",
  },
  {
    icon: Bell,
    number: "06",
    title: "Instant Alerts",
    description:
      "Set up geofence alerts and get notified the moment a tracked device enters or exits a defined area. Customizable notification rules.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-icon-tile text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Why TraceX
          </span>
          <h2 className="text-3xl font-bold text-foreground">
            Everything You Need to Track Locations
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            A complete location intelligence platform — precise, private, and
            always on.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-icon-tile rounded-xl p-3 flex-shrink-0">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-primary mb-1">
                    {f.number}
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
