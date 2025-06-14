
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MapPin, Activity, Zap } from 'lucide-react';

const ValueProposition = () => {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Regenerate Land. Turn a Profit.
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground mb-4">
                    We transform polluted soil into clean, fertile land with the power of AI and precision soil mapping. Bio-based remediation techniques generate
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    high-quality industrial materials, enriching farmers as they enrich their land. The result? Clean food, thriving farmers, and healthy Americans.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">8,865</div>
                  <div className="text-xs text-muted-foreground">Contaminated Sites</div>
                </CardContent>
              </Card>
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">50</div>
                  <div className="text-xs text-muted-foreground">States Affected</div>
                </CardContent>
              </Card>
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">Recovery Rate</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Precision Soil Mapping</h3>
                <p className="text-muted-foreground">
                  Advanced satellite imagery and drone scans identify toxin hotspots with unprecedented accuracy.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Microbiome Analysis</h3>
                <p className="text-muted-foreground">
                  Real-time soil microbiome data reveals the optimal restoration strategy for each field.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered Recommendations</h3>
                <p className="text-muted-foreground">
                  Get precise guidance on what to plant, when to rotate, and which cover crops detoxify specific contaminants.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a href="#" className="inline-flex items-center text-primary font-medium group">
                Learn More About Our Technology
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
