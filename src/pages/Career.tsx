import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Lightbulb,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";

const jobOpenings = [
  {
    id: 1,
    title: "AI Software Engineer Intern",
    department: "Research & Development",
    location: "Remote",
    type: "Internship",
    level: "Entry/Mid-Level",
    salary: "Unpaid",
    posted: "2 days ago",
    description:
      "Join our cutting-edge AI research team to develop next-generation environmental monitoring systems using machine learning and deep learning techniques.",
    requirements: [
      "Currently pursuing a Bachelor’s or Master’s degree in Computer Science, Software Engineering, AI/ML, Data Science, or a related technical field.",
      "Proficiency in at least one major programming language (e.g., Python, C++, or Java) with good coding practices.",
      "Understanding of machine learning concepts, algorithms, and frameworks (e.g., PyTorch or TensorFlow).",
      "Familiarity with version control (Git/GitHub), debugging, testing, and collaborative software development.",
      "Strong analytical thinking with a background in linear algebra, probability, and statistics relevant to AI.",
    ],
    benefits: ["Flexible Hours", "Remote Work"],
    featured: true,
  },
];

const departments = [
  "All",
  "Research & Development",
  "Engineering",
  "Data Science",
  "Infrastructure",
  "Product",
];
const types = ["All", "Full-time", "Contract", "Internship"];
const locations = ["All", "San Francisco", "Remote"];

const Career = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<
    (typeof jobOpenings)[0] | null
  >(null);
  const [tabValue, setTabValue] = useState("vision");

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      coverLetter: "",
      resume: null,
    },
  });
  const filteredJobs = jobOpenings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesLocation =
      selectedLocation === "All" || job.location === selectedLocation;
    const matchesType = selectedType === "All" || job.type === selectedType;
    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
  });
  const onSubmit = (data: any) => {
    console.log("Application submitted:", data);
    setIsApplicationOpen(false);
    form.reset();
  };

  const openApplication = (job: (typeof jobOpenings)[0]) => {
    setSelectedJob(job);
    form.setValue("position", job.title);
    setIsApplicationOpen(true);
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="pt-20  px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Help us build the future of environmental technology. Join a team
              of passionate innovators working to solve the world's most
              pressing environmental challenges through AI and data science.
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="space-y-8"
        >
          <TabsList className="flex justify-center space-x-6 w-full">
            <TabsTrigger value="vision">Our Vision</TabsTrigger>
            <TabsTrigger value="jobs">Open Positions</TabsTrigger>
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
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedType}
                onValueChange={setSelectedType}
              >
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Featured Jobs */}
            {filteredJobs.filter((job) => job.featured).length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Featured Positions
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {filteredJobs
                    .filter((job) => job.featured)
                    .map((job) => (
                      <Card
                        key={job.id}
                        className="group hover:shadow-lg transition-all duration-300 border-primary/20"
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge className="mb-3 bg-primary text-primary-foreground">
                                Featured
                              </Badge>
                              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                {job.title}
                              </CardTitle>
                              <p className="text-muted-foreground mt-1">
                                {job.department}
                              </p>
                            </div>
                            <Badge variant="outline">{job.level}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground">
                            {job.description}
                          </p>
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
                              <Badge
                                key={benefit}
                                variant="secondary"
                                className="text-xs"
                              >
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
                  <Card
                    key={job.id}
                    className="group hover:shadow-md transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            {job.featured && (
                              <Badge className="bg-primary text-primary-foreground">
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline">{job.level}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">
                            {job.department}
                          </p>
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
                        <Button
                          onClick={() => openApplication(job)}
                          className="lg:w-auto w-full"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
          <TabsContent value="vision" className="space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent quicksand-font">
                Overview
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-justify break-normal whitespace-normal">
                OrpheusAI, is a decentralized artificial intelligence platform
                designed to revitalize rural economies and restore contaminated
                U.S. farmland. Launched in 2025, it addresses the crisis of
                industrial agriculture—soil degradation from legacy chemicals
                like glyphosate, PFAs, and heavy metals—while empowering farmers
                with tools for transparency, privacy, and economic sovereignty.
                At its core, OrpheusAI integrates hyperspectral imaging, soil
                sampling data, large language models (LLMs), and latent class
                models (LCMs) to deliver privacy-preserving, interpretable
                phytoremediation recommendations. Coupled with blockchain-based
                zero-knowledge proofs (ZKPs), it enables verifiable land
                valuation and supply chain transactions without exposing
                sensitive proprietary data, functioning essentially as a tracing
                platform for the agricultural economy.
              </p>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent quicksand-font">
                The Solution
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-justify break-normal whitespace-normal">
                OrpheusAI transforms degraded soil into a data-rich economic
                asset through a multi-layered architecture built on Google's
                Alpha Earth geospatial models, tailored for agriculture. Key
                components include: AI-Driven Diagnostics: Real-time analysis of
                pH, microbial life, toxins, and CO₂ sequestration using
                hyperspectral sensors (drones/satellites) and in-situ tests
                (e.g., PLFA for microbial profiling, pXRF for heavy metals).
                LLMs and LCMs provide interpretable phytoremediation strategies,
                such as cover cropping with hyperaccumulators (e.g., Kochia
                scoparia) to extract pollutants up to 12 feet deep, while DNNs
                and CNNs model soil genomics for predictive insights. <br/> Blockchain
                Infrastructure: ORPHEUS’ peer-to-pool network uses Optimized
                PBFT consensus for fast, low-energy finality, tolerating up to
                33% faulty nodes. Decentralized Identifiers (DIDs) and zk-STARKs
                ensure encrypted ownership, with f-blueprints for modular audits
                (e.g., detecting banned pesticides). Data is stored on IPFS for
                tamper-proof retention, enabling offline transactions and
                tokenized rebates via $ORPH stablecoin. Incentive Structures:
                Subscription fees are rebated as $orph, turning users into
                stakeholders. Futures contracts hedge volatility, while
                open-source protocols allow DIY soil tests, fostering
                peer-verified innovation. Intertribal partnerships leverage 50
                million acres of reservation land for bio-based manufacturing
                (e.g., biofuels, bioplastics). Privacy and Resilience: ZKPs
                verify claims (e.g., "organic status") without data exposure,
                while transductive inference ensures localized, context-aware
                predictions. Query compression (e.g., LZ4) optimizes bandwidth
                for distributed networks.<br /> Benefits and Use Cases Farmers: Gain
                equity in land value through verifiable regeneration, premium
                pricing for organic produce, and protection from market
                manipulation. Autonomous farming via AI-guided drones and robots
                (e.g., Optimus integration) boosts yields 10x without chemicals.
                Buyers/Manufacturers: Access transparent supply chains for
                sourcing verified inputs, reducing fraud and enabling bio-based
                industrials (e.g., converting toxin-laden biomass to biofuels at
                119,550 BTU/gallon). Economy: Resets rural America by
                privatizing environmental cleanup, creating a "One Farm"
                networked ecosystem, and disincentivizing monocropping.
                Potential to grow biofuels into a $1 trillion market by 2035.
                Society: Enhances food security, combats agroterrorism, and
                restores ecological balance, aligning with the Genius Act (2025)
                and addressing $300B imports.<br/> Vision and Path Forward OrpheusAI
                is not mere AgTech—it's a plot to resurrect rural America,
                challenging agrochemical cartels and fostering a new agrarian
                republic rooted in decentralized autonomy, open-source science,
                and biological capital. By 2030, it aims to map all U.S.
                farmland, democratize seed banks, and integrate with global
                standards while preserving privacy. Backed by tokenized
                economics and AI agents, it positions farmers as sovereign
                innovators, ensuring civil liberties through land ownership. The
                platform's ultimate goal: a self-sustaining, toxin-free food
                system where technology legislates freedom, health, and
                prosperity.
              </p>
            </div>
            <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Want to Join Our Team?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our mission. 
                Even if you don't see a perfect match in our current openings, we'd love to hear from you.
              </p>
              <Button size="lg" variant="outline" className="px-8" onClick={() => setTabValue("jobs")}>
                Search open jobs
              </Button>
            </section>
          </TabsContent>
        </Tabs>
      </div>
      {/* Application Modal */}
      <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
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
                        <Input {...field} />
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
                        <Input {...field} />
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
                        <Input type="email" {...field} />
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
                        <Input {...field} />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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

export default Career;
