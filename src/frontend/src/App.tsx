import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import { AdminSection } from "./components/AdminSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { FindLocationSection } from "./components/FindLocationSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { LiveMapSection } from "./components/LiveMapSection";
import { ShareLocationSection } from "./components/ShareLocationSection";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleLocate = (_phone: string) => {
    scrollTo("find-location");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} onNavigate={scrollTo} />
      <main className="flex-1">
        <HeroSection onLocate={handleLocate} />
        <FeaturesSection />
        <HowItWorksSection />
        <FindLocationSection />
        <ShareLocationSection />
        <LiveMapSection />
        <AdminSection />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
