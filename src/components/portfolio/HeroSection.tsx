import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Background3D } from "@/components/3d/Background3D";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  isMobileMenuOpen?: boolean;
}

export const HeroSection = ({ isMobileMenuOpen = false }: HeroSectionProps) => {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'pt-160 md:pt-0' : ''}`}>
      {/* 3D Background */}
      <Background3D />
      
      {/* Static Background as fallback */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-primary/10 rounded-lg animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-10 w-12 h-12 border border-primary/30 rounded-lg animate-float" style={{ animationDelay: "4s" }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in order-2 lg:order-1">
            <p className="text-primary font-medium mb-3 sm:mb-4 tracking-wider uppercase text-xs sm:text-sm">
              Software Engineer
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              <span className="text-gradient">Priyansh</span>
              <br />
              <span className="text-foreground">Garg</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Full-Stack Developer with expertise in Java, React Native, and cloud technologies. 
              Building scalable solutions at Kotak Mahindra Bank.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-8 sm:mb-12 px-4 sm:px-0">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" className="group w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
            </div>
            
            <div className="flex gap-4 sm:gap-6 justify-center lg:justify-start">
              <a 
                href="https://www.linkedin.com/in/garg-priyansh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 sm:p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-smooth group"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="mailto:priyanshgarg.iitr@gmail.com"
                className="p-2 sm:p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-smooth group"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="p-2 sm:p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-smooth group"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in order-1 lg:order-2" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110 animate-pulse" />
              
              {/* Profile image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-glow group hover:scale-105 transition-bouncy">
                <img 
                  src="/lovable-uploads/4a0daf9f-1de7-45de-a060-ef384312dc49.png"
                  alt="Priyansh Garg - Software Engineer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
              </div>
              
              {/* Floating tech icons - adjusted for mobile */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 flex items-center justify-center animate-float">
                <span className="text-primary font-bold text-xs sm:text-sm">JS</span>
              </div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 flex items-center justify-center animate-float" style={{ animationDelay: "2s" }}>
                <span className="text-primary font-bold text-xs sm:text-sm">⚛️</span>
              </div>
              <div className="absolute top-1/2 -right-4 sm:-right-8 w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 flex items-center justify-center animate-float" style={{ animationDelay: "4s" }}>
                <span className="text-primary font-bold text-xs">☁️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};