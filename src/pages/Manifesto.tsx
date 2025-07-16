
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, BrainCircuit, Zap } from 'lucide-react';
import { TypingIn, FadeInSubtle, FadeInFromUpStagger } from '@/components/ui/fade-in';

const Manifesto = () => {
  const principles = [
    {
      icon: Camera,
      title: "Hyperspectral Sensors",
      description: "Hyperspectral sensors can identify microbial discrepancies and detect unusual growth patterns often times before a seed germinates."
    },
    {
      icon: BrainCircuit,
      title: "Artificial Intelligence",
      description: "Orpheus’ Artificial Intelligence Platform is trained to monitor real time data and pinpoint anomalies in molecular activity early."
    },
    {
      icon: Zap,
      title: "Power",
      description: " Farmers know when something’s off, Orpheus will make that intuition precise and create the new digital architecture that restores power to American farms."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Top Content */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-background to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">About</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Agrarian Republic:<br></br><span className="text-primary">A Manifesto</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Clean and regional food supplies, all American grown are no longer to be thought of as a luxury, but a basic foundation to national security.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Out Agrarian Roots */}
          <div className="prose prose-invert max-w-none mb-12">
            <TypingIn>
              <h2 className="text-3xl font-bold mb-6">Our Agrarian Roots</h2>
            </TypingIn>
            <FadeInSubtle>
              <p className="text-lg text-muted-foreground mb-6">
                Our founders, farmers themselves, knew the preservation of civil liberties is predicated on private property and the strength of the rural economy that then naturally succeeds.
              </p>
            </FadeInSubtle>
          </div>

          {/* Privacy and Transparency */}
          <div className="prose prose-invert max-w-none mb-12">
            <TypingIn>
              <h2 className="text-3xl font-bold mb-6">Privacy and Transparency</h2>
            </TypingIn>
            <FadeInSubtle>
              <p className="text-lg text-muted-foreground mb-6">
                Modern America has given corporations the right to privacy, before its citizens. 
                Transparency of our supplies, including non-food ingredients and contaminants are a right to health and protection of the success of US supply chains.
              </p>
            </FadeInSubtle>
          </div>

          {/* The Costs of Global Outsourcing */}
          <div className="prose prose-invert max-w-none mb-12">
            <TypingIn>
              <h2 className="text-3xl font-bold mb-6">The Costs of Global Outsourcing</h2>
            </TypingIn>
            <FadeInSubtle>
              <p className="text-lg text-muted-foreground mb-6">
                Today the economy must return to its agrarian foundation. Free trade absolutists and cost-cutting corporations have outsourced our food supplies to India, Brazil, Mexico and China. 
                This half century of self sabotage was not only at the expense of American farmers, but the health of every American. 
              </p>
              {/* Quote */}
              <Card className="bg-primary/10 border-primary/20 mb-6">
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground text-center">
                    Yearly agricultural imports are approaching
                  </p>
                  <p className="text-4xl md:text-6xl font-bold text-center text-primary animate-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] bg-clip-text text-transparent font-bold">$300 billion</p>
                  <cite className="block text-muted-foreground text-right">— USDA</cite>
                </CardContent>
              </Card>
              <p className="text-lg text-muted-foreground mb-6">
                Farmers have no margin of safety and require break even insurance to survive. 
                Meanwhile Americans are battling chronic illness at rates never seen before. 
              </p>
            </FadeInSubtle>
          </div>

          {/* Agroterrorism and Chemical Infiltration */}
          <div className="prose prose-invert max-w-none mb-12">
            <TypingIn>
              <h2 className="text-3xl font-bold mb-6">Agroterrorism and Chemical Infiltration</h2>
            </TypingIn>
            <FadeInSubtle>
              <p className="text-lg text-muted-foreground mb-6">
                Foreign actors have inundated our supply chains with non-food ingredients, unnamed chemicals classified as proprietary and cheap packaging. 
                Agroterrorism has emerged with attacks on American farmers. 
                With mystery suppliers delivering unnamed seeds around America, likely laced with blight and toxic fungi. 
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Well intending organizations within the US do not have the bandwidth to oversee global supply chains and prevent attacks, let alone verify quality and certify food grown abroad as organic. 
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Recently, the HLB “citrus greening” bacteria destroyed most of the Florida orange industry. 
                The US cannot remain dependent on foreign supply chains, seed suppliers and mono-cropping industrialists who have not defended American farmers in the past and do not have the foresight to do so in the future. 
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                American farmers are one season away from an act of agro-terrorism bacteria outbreak wiping out a crop cycle.  
                Moreover, ag-tech and biotech companies are marketing proprietary synthetic fertilizer alternatives as the future of nitrogen and fungicide treatments. 
                Farmers do not trust lab trials, and should have the technological framework to run their own open source field trials. 
              </p>
            </FadeInSubtle>
          </div>

          {/* Restoring Power Through Technology */}
          <div className="prose prose-invert max-w-none mb-12">
            <TypingIn>
              <h2 className="text-3xl font-bold mb-6">Restoring Power Through Technology</h2>
            </TypingIn>

            <div className="grid md:grid-cols-3 gap-8 mb-6">
              {principles.map((principle, index) => (
                <FadeInFromUpStagger className="" delay={index * 200}>
                  <Card key={index} className="flex flex-col h-full text-left">
                    <CardContent className="flex flex-col flex-grow p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center shrink-0 justify-center mb-4">
                          <principle.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold break-words mb-3">{principle.title}</h3>
                      </div>
                      <p className="text-muted-foreground break-words">{principle.description}</p>
                    </CardContent>
                  </Card>
                </FadeInFromUpStagger>
              ))}
            </div>

            <FadeInSubtle>
              <p className="text-lg text-muted-foreground mb-6">
                At a time when rural America is attacked and ignored by lawmakers, banks and technology investors, Orpheus technologies is defending farmers, an early and imperfect attempt it may be, to give farmers end to end control over American supply chains.
              </p>
              <p className="text-xl font-semibold text-primary">
                This is a question of national will. America’s health and civil liberties depend upon it. 
              </p>
            </FadeInSubtle>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manifesto;
