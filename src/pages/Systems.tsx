
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
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms process soil data to identify contamination patterns and optimal remediation strategies.",
      features: ["Toxin mapping", "Predictive modeling", "Risk assessment"]
    },
    {
      icon: Satellite,
      title: "Satellite Imagery Integration",
      description: "Real-time satellite data provides comprehensive field monitoring and change detection capabilities.",
      features: ["Multi-spectral analysis", "Temporal monitoring", "Crop health assessment"]
    },
    {
      icon: Microscope,
      title: "Microbiome Analysis",
      description: "Deep soil microbiome sequencing reveals the biological foundation for effective restoration protocols.",
      features: ["Species identification", "Diversity metrics", "Function analysis"]
    },
    {
      icon: BarChart3,
      title: "Carbon Sequestration Tracking",
      description: "Precise measurement and verification of CO₂e sequestration for carbon credit opportunities.",
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
            <Badge className="mb-4">Advanced Technology</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered <span className="text-primary">Soil Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our comprehensive platform integrates cutting-edge AI, satellite imagery, and biological analysis 
              to deliver unprecedented insights into soil health and restoration.
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each component of our system works together to provide comprehensive soil analysis and restoration guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {systemFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
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
