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

const FeaturesSection = () => {
  return (
    <section id="scroll-target-section" className="py-24 bg-card to-muted/20">
      <div className="w-fit max-w-4xl mx-auto px-10 sm:px-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent quicksand-font">
          Own Your Supply Chain
        </h1>
        <hr className="border-t border-muted-foreground my-6" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent quicksand-font">
          Own Your Land
        </h1>
        <hr className="border-t border-muted-foreground my-6" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent quicksand-font">
          Encrypt Your Network
        </h1>
        <hr className="border-t border-muted-foreground my-6" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent quicksand-font">
          Understand the Earth
        </h1>
        <hr className="border-t border-muted-foreground my-6" />
        <p className="text-xl text-muted-foreground leading-relaxed mb-4 mt-8">
          Our Platform traces every food item back to its source.
        </p>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We Create a Network for Pro American Industrialists and Farmers by offering users access to AI powered tracking of Global Food Supplies and Commodity Markets
        </p>

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
