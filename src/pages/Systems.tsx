
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Satellite, 
  Microscope, 
  Cpu, 
  BarChart3, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Systems = () => {
  const systemFeatures = [
    {
      icon: Brain,
      title: "SoilSync AI",
      description: "Unlock the power of your land with AI-driven soil diagnostics. Our hyperspectral imaging and machine learning analyze pH, microbial life, and toxins"
        + " (e.g., PFAs, heavy metals) in real time. Get tailored phytoremediation strategies to boost yields up to 10x and certify your soil for organic premiums. Sell anonymized soil data to researchers and brands for extra revenue, all while keeping your privacy secure.",
      features: ["Maximize Yields", "Precision Soil Insights"]
    },
    {
      icon: Satellite,
      title: "FarmShield Contracts",
      description: "Hedge against price swings and lock in input costs with our blockchain-based futures contracts."
        + " Our peer-to-pool marketplace connects you directly to buyers and manufacturers, cutting out middlemen. Draft smart contracts to stabilize income and protect against crop losses, ensuring your farm thrives in any market.",
      features: ["Secure Your Profits", "Stress Free"]
    },
    {
      icon: Microscope,
      title: "LandGuard DIDs",
      description: "Safeguard your property rights with encrypted Decentralized Land Identifiers (DIDs). Prove regenerative practices and soil quality without exposing sensitive data, using our blockchain for trustless verification."
        + " Build a reputation for sustainable farming and charge premium prices for organic produce.",
      features: ["Own Your Land", "Protect Your Future"]
    },
    {
      icon: BarChart3,
      title: "Land Equity Earn While You Farm",
      description: "Subscribe to OrpheusAI tools and get 100% of your fees back as $ENTR tokens. Use them to trade organic crops, cover crops, or bio-based materials"
        + " (e.g., biofuels, bioplastics) in our decentralized marketplace. Every subscription makes you a stakeholder, driving wealth back to rural communities.",
      features: ["Real-time monitoring", "Verification protocols", "Credit generation"]
    },
    {
      icon: Cpu,
      title: "EarthRome",
      description: "EarthRome is a decentralized data integration and analytics platform designed for regenerative agriculture and environmental monitoring."
        + " It aggregates soil health, crop production, and supply chain data from farmers using IoT devices  and open-source testing protocols.",
      features: ["Real-time monitoring", "Verification protocols", "Credit generation"]
    }
  ];

  const workflow = [
    { step: 1, title: "Data Collection", description: "Satellite imagery, drone scans, and soil samples" },
    { step: 2, title: "AI Analysis", description: "Machine learning processes all data streams" },
    { step: 3, title: "Recommendations", description: "Precise, actionable farming guidance" },
    { step: 4, title: "Implementation", description: "Execute remediation and restoration plans" },
    { step: 5, title: "Monitoring", description: "Continuous tracking and optimization" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4">Systems</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Core <span className="text-primary">Technologies</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Each component of our system works together to provide comprehensive soil analysis and restoration guidance.
            </p>
            <Button size="lg" className="group">
              Request Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Core Systems */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {systemFeatures.map((feature, index) => (
              <Card key={index} className="sm:max-w-sm md:max-w-xs lg:max-w-xl group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process transforms complex data into actionable insights for farmers.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {workflow.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/30">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {index < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30 transform translate-x-3"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the agricultural revolution. Start restoring your soil health and boosting yields today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Start Free Trial</Button>
            <Button variant="outline" size="lg">Schedule Consultation</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Systems;
