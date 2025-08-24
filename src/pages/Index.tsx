import { useState } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { LeetCodeSection } from "@/components/portfolio/LeetCodeSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { ChatButton } from "@/components/chat/ChatButton";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main>
        <HeroSection isMobileMenuOpen={isMobileMenuOpen} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <LeetCodeSection />
        <ContactSection />
      </main>
      
      {/* Live Chat */}
      <ChatButton />
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Priyansh Garg. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
