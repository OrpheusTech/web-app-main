import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Search, User, ArrowRight, Eye, Heart, MessageCircle, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Environmental Science",
    excerpt: "Exploring how artificial intelligence is revolutionizing our approach to environmental monitoring and conservation efforts worldwide.",
    content: "Artificial intelligence is transforming environmental science in unprecedented ways...",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "/placeholder.svg",
      bio: "Environmental AI Researcher"
    },
    publishedAt: new Date('2024-12-15'),
    readTime: "8 min read",
    category: "AI Research",
    tags: ["AI", "Environment", "Research", "Innovation"],
    image: "/placeholder.svg",
    views: 1234,
    likes: 89,
    comments: 23,
    featured: true
  },
  {
    id: 2,
    title: "Building Sustainable Data Centers",
    excerpt: "How green technology is shaping the future of data infrastructure and reducing carbon footprints in the tech industry.",
    content: "The tech industry is increasingly focusing on sustainability...",
    author: {
      name: "Mark Rodriguez",
      avatar: "/placeholder.svg",
      bio: "Infrastructure Engineer"
    },
    publishedAt: new Date('2024-12-10'),
    readTime: "6 min read",
    category: "Technology",
    tags: ["Sustainability", "Data Centers", "Green Tech"],
    image: "/placeholder.svg",
    views: 987,
    likes: 65,
    comments: 18,
    featured: false
  },
  {
    id: 3,
    title: "Machine Learning for Climate Prediction",
    excerpt: "Deep dive into how machine learning models are improving weather forecasting and climate change predictions.",
    content: "Climate prediction has been revolutionized by machine learning...",
    author: {
      name: "Emily Watson",
      avatar: "/placeholder.svg",
      bio: "Climate Data Scientist"
    },
    publishedAt: new Date('2024-12-05'),
    readTime: "12 min read",
    category: "Data Science",
    tags: ["Machine Learning", "Climate", "Prediction", "Analytics"],
    image: "/placeholder.svg",
    views: 2156,
    likes: 145,
    comments: 34,
    featured: true
  },
  {
    id: 4,
    title: "The Ethics of Environmental AI",
    excerpt: "Examining the ethical implications and responsibilities when developing AI systems for environmental applications.",
    content: "As AI becomes more prevalent in environmental science...",
    author: {
      name: "Prof. James Liu",
      avatar: "/placeholder.svg",
      bio: "AI Ethics Researcher"
    },
    publishedAt: new Date('2024-11-28'),
    readTime: "10 min read",
    category: "Ethics",
    tags: ["Ethics", "AI", "Responsibility", "Environment"],
    image: "/placeholder.svg",
    views: 1543,
    likes: 102,
    comments: 45,
    featured: false
  },
  {
    id: 5,
    title: "Open Source Tools for Environmental Monitoring",
    excerpt: "A comprehensive guide to the best open-source tools and libraries for environmental data collection and analysis.",
    content: "The open-source community has developed incredible tools...",
    author: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg",
      bio: "Open Source Developer"
    },
    publishedAt: new Date('2024-11-20'),
    readTime: "15 min read",
    category: "Tools",
    tags: ["Open Source", "Tools", "Monitoring", "Development"],
    image: "/placeholder.svg",
    views: 3421,
    likes: 278,
    comments: 67,
    featured: false
  },
  {
    id: 6,
    title: "Real-time Environmental Data Visualization",
    excerpt: "Learn how to create compelling and informative visualizations for environmental data using modern web technologies.",
    content: "Data visualization is crucial for understanding environmental trends...",
    author: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg",
      bio: "Data Visualization Engineer"
    },
    publishedAt: new Date('2024-11-15'),
    readTime: "9 min read",
    category: "Visualization",
    tags: ["Visualization", "Data", "Real-time", "Web Development"],
    image: "/placeholder.svg",
    views: 1876,
    likes: 156,
    comments: 29,
    featured: false
  }
];

const categories = ["All", "AI Research", "Technology", "Data Science", "Ethics", "Tools", "Visualization"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Insights & Innovations
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explore the latest developments in AI, environmental science, and sustainable technology. 
            Stay updated with cutting-edge research and practical insights from our team of experts.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles, topics, or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && searchTerm === "" && selectedCategory === "All" && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-md">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{post.author.name}</p>
                          <p className="text-xs text-muted-foreground">{format(post.publishedAt, 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter by:
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3" variant="secondary">
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(post.publishedAt, 'MMM dd')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {post.views}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback className="text-xs">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <section className="mt-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest insights delivered directly to your inbox. 
            Be the first to know about new articles, research findings, and industry updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email address"
              className="flex-1"
            />
            <Button className="sm:px-8">
              Subscribe
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
