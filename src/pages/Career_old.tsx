import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Search, 
  Briefcase, 
  Heart, 
  Coffee, 
  Zap, 
  Globe, 
  TrendingUp,
  Award,
  BookOpen,
  Shield,
  Upload,
  Send,
  ChevronRight,
  Star,
  Target,
  Lightbulb
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';

// Mock job data
const jobOpenings = [
  {
    id: 1,
    title: "Senior AI Research Scientist",
    department: "Research & Development",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Senior",
    salary: "$150k - $200k",
    posted: "2 days ago",
    description: "Join our cutting-edge AI research team to develop next-generation environmental monitoring systems using machine learning and deep learning techniques.",
    requirements: [
      "PhD in Computer Science, AI, or related field",
      "5+ years of experience in machine learning research",
      "Experience with PyTorch, TensorFlow, or similar frameworks",
      "Strong publication record in top-tier conferences",
      "Experience with environmental data analysis preferred"
    ],
    benefits: ["Health Insurance", "401k", "Flexible Hours", "Remote Work", "Learning Budget"],
    featured: true
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Level",
    salary: "$90k - $130k",
    posted: "5 days ago",
    description: "Build beautiful and intuitive user interfaces for our environmental data visualization platform using modern web technologies.",
    requirements: [
      "3+ years of experience with React/TypeScript",
      "Strong understanding of modern CSS and responsive design",
      "Experience with data visualization libraries (D3.js, Chart.js)",
      "Knowledge of web performance optimization",
      "Experience with testing frameworks"
    ],
    benefits: ["Health Insurance", "401k", "Remote Work", "Learning Budget", "Stock Options"],
    featured: false
  },
  {
    id: 3,
    title: "Environmental Data Scientist",
    department: "Data Science",
    location: "Boston, MA",
    type: "Full-time",
    level: "Mid-Level",
    salary: "$110k - $150k",
    posted: "1 week ago",
    description: "Analyze complex environmental datasets to extract meaningful insights and support our mission of environmental conservation through data-driven solutions.",
    requirements: [
      "MS/PhD in Environmental Science, Statistics, or related field",
      "Strong programming skills in Python or R",
      "Experience with statistical modeling and data analysis",
      "Knowledge of environmental monitoring systems",
      "Excellent communication and visualization skills"
    ],
    benefits: ["Health Insurance", "401k", "Flexible Hours", "Conference Budget", "Research Time"],
    featured: true
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Austin, TX",
    type: "Full-time",
    level: "Senior",
    salary: "$120k - $160k",
    posted: "3 days ago",
    description: "Design and maintain scalable infrastructure to support our AI-powered environmental monitoring platform at global scale.",
    requirements: [
      "5+ years of experience in DevOps/Infrastructure",
      "Strong knowledge of AWS/GCP/Azure",
      "Experience with Kubernetes and containerization",
      "Proficiency in Infrastructure as Code (Terraform, CloudFormation)",
      "Experience with monitoring and observability tools"
    ],
    benefits: ["Health Insurance", "401k", "Remote Work", "Stock Options", "On-call Compensation"],
    featured: false
  },
  {
    id: 5,
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    level: "Senior",
    salary: "$130k - $170k",
    posted: "4 days ago",
    description: "Lead product strategy and development for our environmental AI platform, working closely with engineering, design, and business teams.",
    requirements: [
      "5+ years of product management experience",
      "Experience with B2B SaaS products",
      "Strong analytical and strategic thinking skills",
      "Experience with agile development methodologies",
      "Background in environmental or sustainability sector preferred"
    ],
    benefits: ["Health Insurance", "401k", "Flexible Hours", "Stock Options", "Product Budget"],
    featured: false
  },
  {
    id: 6,
    title: "Machine Learning Engineer",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Full-time",
    level: "Mid-Level",
    salary: "$100k - $140k",
    posted: "6 days ago",
    description: "Build and deploy machine learning models for real-time environmental monitoring and prediction systems.",
    requirements: [
      "3+ years of experience in ML engineering",
      "Strong programming skills in Python",
      "Experience with MLOps and model deployment",
      "Knowledge of cloud platforms and containerization",
      "Experience with time-series analysis preferred"
    ],
    benefits: ["Health Insurance", "401k", "Remote Work", "Learning Budget", "Conference Budget"],
    featured: false
  }
];

const departments = ["All", "Research & Development", "Engineering", "Data Science", "Infrastructure", "Product"];
const locations = ["All", "Remote", "San Francisco, CA", "Boston, MA", "Austin, TX", "New York, NY", "Seattle, WA"];

const companyValues = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're passionate about using technology to solve environmental challenges and create a sustainable future."
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We embrace cutting-edge technologies and encourage creative thinking to push the boundaries of what's possible."
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "We believe in the power of teamwork and foster an inclusive environment where everyone's voice matters."
  },
  {
    icon: TrendingUp,
    title: "Growth Mindset",
    description: "We invest in our people's development and provide opportunities for continuous learning and advancement."
  }
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    items: ["Comprehensive health insurance", "Mental health support", "Wellness stipend", "On-site gym"]
  },
  {
    icon: DollarSign,
    title: "Financial Benefits",
    items: ["Competitive salary", "Equity options", "401(k) matching", "Performance bonuses"]
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    items: ["Flexible working hours", "Remote work options", "Unlimited PTO", "Sabbatical program"]
  },
  {
    icon: BookOpen,
    title: "Learning & Development",
    items: ["Learning budget", "Conference attendance", "Internal workshops", "Mentorship programs"]
  }
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "VP of Engineering",
    image: "/placeholder.svg",
    quote: "The opportunity to work on technology that directly impacts environmental conservation is incredibly fulfilling."
  },
  {
    name: "Michael Chen",
    role: "Senior Data Scientist",
    image: "/placeholder.svg",
    quote: "I love the collaborative culture here. Every team member brings unique expertise that makes us stronger."
  },
  {
    name: "Emily Rodriguez",
    role: "Product Designer",
    image: "/placeholder.svg",
    quote: "The company truly supports work-life balance. I can pursue my passion projects while doing meaningful work."
  }
];

const Career_old = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof jobOpenings[0] | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      coverLetter: "",
      resume: null
    }
  });

  // Filter jobs
  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === "All" || job.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const onSubmit = (data: any) => {
    console.log("Application submitted:", data);
    setIsApplicationOpen(false);
    form.reset();
  };

  const openApplication = (job: typeof jobOpenings[0]) => {
    setSelectedJob(job);
    form.setValue("position", job.title);
    setIsApplicationOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Help us build the future of environmental technology. Join a team of passionate innovators 
              working to solve the world's most pressing environmental challenges through AI and data science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                View Open Positions
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn About Our Culture
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Employee Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <div className="text-sm text-muted-foreground">Glassdoor Rating</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="jobs" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jobs">Open Positions</TabsTrigger>
            <TabsTrigger value="culture">Our Culture</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="team">Meet the Team</TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-8">
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs by title or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Featured Jobs */}
            {filteredJobs.filter(job => job.featured).length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Featured Positions</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {filteredJobs.filter(job => job.featured).map((job) => (
                    <Card key={job.id} className="group hover:shadow-lg transition-all duration-300 border-primary/20">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge className="mb-3 bg-primary text-primary-foreground">Featured</Badge>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {job.title}
                            </CardTitle>
                            <p className="text-muted-foreground mt-1">{job.department}</p>
                          </div>
                          <Badge variant="outline">{job.level}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.posted}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.slice(0, 3).map((benefit) => (
                            <Badge key={benefit} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={() => openApplication(job)}
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          Apply Now
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* All Jobs */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                All Positions ({filteredJobs.length})
              </h2>
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="group hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            {job.featured && (
                              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                            )}
                            <Badge variant="outline">{job.level}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{job.department}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.posted}
                            </span>
                          </div>
                        </div>
                        <Button onClick={() => openApplication(job)} className="lg:w-auto w-full">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Culture Tab */}
          <TabsContent value="culture" className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {companyValues.map((value, index) => (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">What Our Employees Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <Avatar className="h-16 w-16 mx-auto mb-4">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex justify-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic mb-4">"{member.quote}"</p>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Benefits Tab */}
          <TabsContent value="benefits" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Comprehensive Benefits Package
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((category, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <category.icon className="h-8 w-8 text-primary" />
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Join Us?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover how you can make a meaningful impact while enjoying industry-leading benefits 
                and a supportive work environment.
              </p>
              <Button size="lg" className="px-8">
                Browse Open Positions
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </section>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-8">
            <section className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our diverse team of experts from around the world is united by a shared passion for 
                environmental conservation and cutting-edge technology.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground italic">"{member.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Want to Join Our Team?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our mission. 
                Even if you don't see a perfect match in our current openings, we'd love to hear from you.
              </p>
              <Button size="lg" variant="outline" className="px-8">
                Send Us Your Resume
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Modal */}
      <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Apply for {selectedJob?.title}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="4-5">4-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormLabel>Resume/CV</FormLabel>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop your resume here, or click to browse
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Submit Application
                  <Send className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsApplicationOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Career_old;
