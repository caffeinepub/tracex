import { MapPin, PhoneCall, Share2 } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: PhoneCall,
    step: "Step 1",
    title: "Enter Phone Number",
    description:
      "Type in the phone number you want to locate or share from. No app install needed.",
  },
  {
    icon: Share2,
    step: "Step 2",
    title: "Share or Search Location",
    description:
      "Either share your current GPS position or look up a number that has already shared their location.",
  },
  {
    icon: MapPin,
    step: "Step 3",
    title: "View on Map",
    description:
      "Instantly see the location pinned on an interactive map with address details and timestamp.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-icon-tile text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Get started in seconds — no signup required for basic location
            sharing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="inline-flex bg-primary/10 rounded-2xl p-4 mb-5">
                <s.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-xs font-bold text-primary mb-1">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
