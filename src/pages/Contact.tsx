
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Innovation Drive", "San Francisco, CA 94105"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) ORPHEUS", "+1 (555) 677-4387"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@orpheus.ai", "support@orpheus.ai"]
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Monday - Friday", "9:00 AM - 6:00 PM PST"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Get in Touch</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact <span className="text-primary">Orpheus AI</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to transform your farm? Have questions about our technology? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your Farm or Organization" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your farming operation and how Orpheus AI can help..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full" size="lg">Send Message</Button>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule a Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    See our AI-powered soil intelligence platform in action. We'll customize the demo 
                    to show how Orpheus AI can specifically benefit your farming operation.
                  </p>
                  <Button className="w-full" variant="outline">Book Demo Call</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Already using Orpheus AI? Our support team is here to help you get the most 
                    out of our platform.
                  </p>
                  <Button className="w-full" variant="outline">Visit Support Center</Button>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle>Partnership Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Interested in partnering with Orpheus AI? We work with agricultural 
                    organizations, research institutions, and technology partners.
                  </p>
                  <Button className="w-full">Explore Partnerships</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
