
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Leaf, Globe, Users } from 'lucide-react';

const Manifesto = () => {
  const principles = [
    {
      icon: Leaf,
      title: "Soil First",
      description: "Healthy soil is the foundation of a healthy planet. We believe in regenerative practices that restore the earth's natural fertility."
    },
    {
      icon: Globe,
      title: "Sustainable Innovation",
      description: "Technology should serve nature, not exploit it. Our AI solutions work in harmony with natural systems."
    },
    {
      icon: Users,
      title: "Farmer Empowerment",
      description: "Farmers are the stewards of our land. We provide tools that make them more successful while healing the earth."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Our Mission</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-primary">Manifesto</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            We believe in a future where agriculture heals the planet while feeding the world.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quote */}
          <Card className="bg-primary/10 border-primary/20 mb-12">
            <CardContent className="p-8">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-4">
                "The earth does not belong to us; we belong to the earth. All things are connected like the blood which unites one family."
              </blockquote>
              <cite className="text-muted-foreground">— Chief Seattle</cite>
            </CardContent>
          </Card>

          {/* The Problem */}
          <div className="prose prose-invert max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-6">The Crisis We Face</h2>
            <p className="text-lg text-muted-foreground mb-6">
              For too long, industrial agriculture has treated soil as a commodity rather than a living ecosystem. 
              The result? Widespread contamination, depleted nutrients, and a food system that's making us sick.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              PFAS, heavy metals, and chemical residues have infiltrated our farmland. Carbon that should be 
              sequestered in healthy soil is instead released into the atmosphere. Farmers struggle with 
              declining yields while battling contamination they didn't create.
            </p>
            <p className="text-lg text-muted-foreground">
              But this isn't just an environmental crisis—it's a crisis of health, economy, and sovereignty. 
              When our soil is sick, everything suffers.
            </p>
          </div>

          {/* Our Vision */}
          <div className="prose prose-invert max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We envision a world where farming regenerates the earth instead of depleting it. Where AI and 
              technology amplify nature's wisdom rather than replacing it. Where farmers are rewarded for 
              being stewards of the land.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              This isn't about going backward—it's about leaping forward. We combine cutting-edge artificial 
              intelligence with time-tested regenerative practices to create solutions that are both 
              scientifically rigorous and ecologically sound.
            </p>
            <p className="text-lg text-muted-foreground">
              Clean food. Healthy soil. Profitable farms. Carbon sequestration. These aren't competing goals—
              they're synergistic outcomes of a system that works with nature instead of against it.
            </p>
          </div>

          {/* Principles */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Principles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {principles.map((principle, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <principle.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* The Path Forward */}
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6">The Path Forward</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The solution isn't to abandon technology—it's to use it wisely. Our AI doesn't replace the 
              farmer's knowledge; it amplifies it. Our sensors don't control nature; they help us understand it.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We're building tools that help farmers see what's happening in their soil at the microscopic level, 
              track carbon sequestration in real-time, and turn contaminated land into profitable, productive farms.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              This is about more than farming—it's about reclaiming our food sovereignty, healing our planet, 
              and building an economy that values life over extraction.
            </p>
            <p className="text-lg font-semibold text-primary">
              The future of farming isn't just sustainable—it's regenerative. And it starts now.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manifesto;
