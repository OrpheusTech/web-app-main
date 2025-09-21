import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ui/scroll-to-top";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard-working";
import Systems from "./pages/Systems";
import Manifesto from "./pages/Manifesto";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Career from "./pages/Career";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Terminal from "./pages/Terminal";
import Economics from "./pages/Economics";
import Food from "./pages/Food"

const queryClient = new QueryClient();

// Get the base path for GitHub Pages deployment
const basename = import.meta.env.PROD ? '/web-app-main' : '';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Career />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/terminal" element={<Terminal />}/>
          <Route path="/economics" element={<Economics />}/>
          <Route path="/food" element={<Food />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
