import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cpu, 
  Leaf, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: "AI-Powered Analytics",
    description: "Advanced machine learning algorithms analyze soil composition, weather patterns, and crop health in real-time.",
    benefits: ["Real-time monitoring", "Predictive insights", "Automated recommendations"],
    color: "from-blue-500 to-purple-600"
  },
  {
    icon: Leaf,
    title: "Soil Health Optimization",
    description: "Comprehensive soil analysis and management recommendations to maximize fertility and sustainability.",
    benefits: ["Nutrient optimization", "pH balance", "Organic matter enhancement"],
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: TrendingUp,
    title: "Yield Optimization",
    description: "Data-driven strategies to increase crop yields while reducing resource consumption and environmental impact.",
    benefits: ["25% yield increase", "30% resource savings", "ROI tracking"],
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: Shield,
    title: "Environmental Protection",
    description: "Sustainable farming practices that protect ecosystems while maintaining high productivity levels.",
    benefits: ["Carbon footprint reduction", "Water conservation", "Biodiversity protection"],
    color: "from-cyan-500 to-blue-600"
  },
  {
    icon: Zap,
    title: "Rapid Implementation",
    description: "Quick deployment with minimal disruption to existing operations and immediate actionable insights.",
    benefits: ["24-hour setup", "No downtime", "Instant results"],
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "24/7 support from agricultural experts and data scientists to ensure optimal system performance.",
    benefits: ["24/7 availability", "Expert consultation", "Training included"],
    color: "from-indigo-500 to-purple-600"
  }
];

const FeaturesSection = () => {
  return (
    <section id="scroll-target-section" className="py-24 bg-card to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent quicksand-font">
            Revitalize Your
            <span className="block text-primary">Farm</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your agricultural operations with cutting-edge AI technology designed specifically for modern farming challenges.
          </p>
        </div>

        {/* Features Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div> */}

      </div>
    </section>
  );
};

export default FeaturesSection;
