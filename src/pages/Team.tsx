
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { FadeInFromUpStagger } from '@/components/ui/fade-in';
import { VineIllustration } from '@/components/ui/vine';

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former NASA scientist with 15 years in satellite imagery analysis. PhD in Environmental Engineering from MIT.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      social: { linkedin: "#", twitter: "#", email: "sarah@orpheus.ai" }
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "AI researcher specializing in computer vision and machine learning. Previously at Google DeepMind.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      social: { linkedin: "#", twitter: "#", email: "marcus@orpheus.ai" }
    },
    {
      name: "Dr. Elena Vasquez",
      role: "Head of Agricultural Science",
      bio: "Soil microbiologist with expertise in regenerative agriculture. Former USDA researcher with 20+ publications.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      social: { linkedin: "#", twitter: "#", email: "elena@orpheus.ai" }
    },
    {
      name: "James Patterson",
      role: "Head of Partnerships",
      bio: "Fourth-generation farmer turned agtech evangelist. Deep relationships across the agricultural community.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      social: { linkedin: "#", twitter: "#", email: "james@orpheus.ai" }
    }
  ];

  const advisors = [
    {
      name: "Dr. Michael Thompson",
      role: "Agricultural Advisor",
      bio: "Former Secretary of Agriculture, 30+ years in agricultural policy and sustainable farming practices."
    },
    {
      name: "Lisa Park",
      role: "Technology Advisor",
      bio: "Serial entrepreneur and former VP of Engineering at Tesla. Expert in scaling deep tech companies."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Meet the Team</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The People Behind <span className="text-primary">Orpheus AI</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A diverse team of scientists, engineers, and farmers united by a common mission to heal the earth.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Core Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {teamMembers.map((member, index) => (
              <FadeInFromUpStagger delay={index * 200}>
                <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-primary/60 hover:-translate-y-2 transition-* vine-container h-full flex flex-col">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center relative h-32">
                      <VineIllustration className="w-24 h-full stroke-primary transform scale-x-[-1] -rotate-45"/>
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <VineIllustration className="w-24 h-full stroke-primary rotate-45"/>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    
                    <div className="flex justify-center space-x-3">
                      <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a href={member.social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a href={`mailto:${member.social.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </FadeInFromUpStagger>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Advisors</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{advisor.name}</h3>
                  <p className="text-primary font-medium mb-3">{advisor.role}</p>
                  <p className="text-muted-foreground">{advisor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for passionate individuals who want to make a difference in agriculture and environmental restoration.
          </p>
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">We're Hiring</h3>
              <p className="text-muted-foreground mb-6">
                Explore opportunities to work with cutting-edge AI technology while making a positive impact on the planet.
              </p>
              <a 
                href="mailto:careers@orpheus.ai" 
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                <Mail className="mr-2 h-4 w-4" />
                careers@orpheus.ai
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
