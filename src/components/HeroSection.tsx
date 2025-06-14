
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Cpu, Leaf, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-foreground">The Future of</span>
            <span className="block text-primary">Farming</span>
          </h1>
          
          <div className="max-w-2xl mx-auto mb-8 space-y-2">
            <p className="text-xl md:text-2xl text-muted-foreground">Radically Clean</p>
            <p className="text-xl md:text-2xl text-muted-foreground">Independently American</p>
            <p className="text-xl md:text-2xl text-muted-foreground">Built for Farmers</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="group bg-background/10 backdrop-blur-sm">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
              <span className="ml-2 text-xs text-muted-foreground">(animated video)</span>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="text-sm">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm">Soil Health</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm">Yield Optimization</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
