
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
      name: "Aiden Young",
      role: "Chief Executive Officer",
      bio: "Aiden Young founded OrpheusAI in January 2025. He has served as our Chief Executive Officer since the start up’s founding.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "" }
    },
    {
      name: "Gagan Gupta",
      role: "AI Software Engineer",
      bio: "Gagan Gupta is an AI software engineer and a founding team member at OrpheusAI. He holds a B.Tech in Computer Science from PES University, Bengaluru. Prior to joining OrpheusAI, he co-founded EduPrepAI, an AI-powered learning platform that received grant support from Meta and AMD, and served as founding engineer at MedMitra AI, a healthcare AI startup that raised $350K in angel investment. He is also a 5-time national hackathon winner and holds a patent in multimodal health AI research.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "" }
    },
    {
      name: "Alessandro Burlando",
      role: "AI Software Engineer",
      bio: "Alessandro Burlando is a computer scientist. He is from Genoa, Italy.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "" }
    },
    {
      name: "Emanuele Gaz",
      role: "Chief Technology Officer",
      bio: "Emanuele Gaz is our CTO and holds a B.S.c in Physics from the University of Trento. He also holds M.S.c in Physics with specialization in Quantum Information and Technologies from the Hebrew University of Jerusalem, and an MBA in Energy and Environmental Management and Economics from the Università di Pavia. ",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "" }
    },
    {
      name: "Krishna Phanindra ",
      role: "AI Software Engineer",
      bio: "Krishna Phanindra Marupaka is a AI Engineer and applied AI researcher with 2+ years of experience in deep learning for agriculture, computer vision, and NLP. He has built scalable ML pipelines using PyTorch, TensorFlow, and Azure ML for real-time geospatial analytics, and developed multi-modal models with Vision Transformers and spatial-temporal attention to predict crop yield from satellite and climate data. His work includes processing drone and hyperspectral imagery, optimizing models for toxin detection and nutrient mapping, and deploying cloud-native AI solutions. Published a paper on the detection of Pap smear Cells using CNN and Pre-trained Vision and Swin transformer in IEEE ISBI2025 conference. Received 3rd place in the Kaggle IEEE ISBI 2025 competition.  An NSF I-CORPS badge holder and Discover 60 participant, Krishna combines technical expertise with market-focused research, backed by peer-reviewed publications, competition wins, and cross-disciplinary collaboration.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "" }
    },
    {
      name: "Sean Cheng",
      role: "Full Stack Engineer",
      bio: "Sean Cheng holds a B.S. in Computer Science from University of Maryland, College Park. He joined OrpheusAI’s founding team shortly after graduating and previously taught at Kumon.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "" }
    },
    {
      name: "Honovi Trudell",
      role: "Chief Operations Officer",
      bio: "Honovi Trudell is a former member of the United States Coast Guard and the Baltimore City Police Department. Mr Trudell has worked for non-profits dedicated to regenerative agriculture and led sustainability projects in rural America.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "" }
    },
    {
      name: "Thoyajaksha Kashyap",
      role: "AI Software Engineer",
      bio: "Thoyajaksha Kashyap holds an M.S. in Computer Science from the University of South Dakota, where he specialized in AI-driven healthcare and assistive technologies. His work includes developing an AI Smart Stick for the Visually Impaired during a DRDO internship, creating deep learning models for brain tumor and kidney disease detection (both IEEE-published), and building a Pap smear classification system using CNN and Transformers. Beyond healthcare AI, he engineered an NLP KPI Dashboard for gaming analytics and delivers solutions spanning embedded systems, computer vision, NLP, and full-stack development.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "" }
    },
    {
      name: "Tom Follett",
      role: "AI Researcher",
      bio: "Tom Follett holds a B.A. in mathematics from the University of San Diego. Tom resides in the Bay Area, and spends his free time teaching classical guitar lessons.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "" }
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-background to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Meet the Team</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The People Behind <span className="text-primary">Orpheus AI</span>
          </h1>
          <p className="text-xl text-muted-foreground">
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-12 mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Core Team</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {teamMembers.map((member, index) => (
              <Card key={index} className="relative max-w-sm mb-4 break-inside-avoid group hover:shadow-lg transition-all duration-300 hover:ring-2 hover:ring-primary/60 hover:-translate-y-2 transition-* vine-container h-full flex flex-col">
                <CardContent className="p-6 text-center">
                  { /* Profile Pictures
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
                  */ }
                  <div className="flex items-center justify-center relative h-32">
                    <VineIllustration className="w-24 h-full stroke-primary transform scale-x-[-1] -rotate-45"/>
                    <h3 className="text-2xl font-semibold mb-1 text-center whitespace-pre">{member.name}</h3>
                    <VineIllustration className="w-24 h-full stroke-primary rotate-45"/>
                  </div>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  
                  { /* Social media and email buttons
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
                  */ }
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors
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
      */}

      <Footer />
    </div>
  );
};

export default Team;
