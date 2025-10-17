
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Leaf, User, Settings, LogOut, Bell, CreditCard, HelpCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/systems' },
    // { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/manifesto' },
    { name: 'Our Team', path: '/team' },
    //{ name: 'Terminal', path: '/terminal' },
    //{ name: 'Careers', path: '/careers' }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg",
    initials: "JD"
  };

  const handleProfileAction = (action: string) => {
    console.log(`Profile action: ${action}`);
    // Handle different profile actions here
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        console.log('Navigate to settings');
        break;
      case 'billing':
        console.log('Navigate to billing');
        break;
      case 'help':
        console.log('Navigate to help');
        break;
      case 'logout':
        console.log('Logout user');
        break;
      default:
        break;
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/40 supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Increased height from h-16 to h-20 */}
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-1 group py-2">
            <div className="relative">
              <svg 
                fill="#ffd700" 
                viewBox="0 0 32 32" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              >
                <path d="M 26 7 L 25.699219 6.699219 C 24 4.800781 21.5 4.199219 21.5 4.199219 C 18.5 3.300781 13.800781 5.300781 9.601563 9.398438 C 6.101563 12.699219 4 16.699219 4 19.699219 C 4 20.101563 4.101563 20.5 4.101563 20.898438 C 4.300781 22.898438 5.601563 25 6.699219 26 C 8.101563 27.398438 9.898438 28.101563 11.898438 28.101563 C 15.199219 28.101563 19.101563 26.199219 22.699219 22.800781 C 28.300781 17.300781 29.699219 10.800781 26 7 Z M 10 21.699219 C 10 20.398438 11.398438 17.699219 14.398438 14.699219 C 17.300781 11.800781 20.300781 11 21.699219 10.699219 C 21 12.601563 19.5 14.898438 17.300781 17.101563 C 15.199219 19.101563 12.800781 20.699219 10.699219 21.5 C 10.5 21.601563 10.199219 21.601563 10 21.699219 Z M 11 10.800781 C 14.300781 7.5 17.800781 5.898438 20 5.898438 C 20.699219 5.898438 21.300781 6.101563 21.699219 6.5 C 22.101563 6.898438 22.300781 7.699219 22.199219 8.601563 C 21 8.699219 16.898438 9.398438 13 13.300781 C 10.5 15.800781 7.898438 19.398438 8.101563 21.898438 C 7.5 21.898438 6.898438 21.699219 6.601563 21.398438 C 6.398438 21.199219 6.199219 20.898438 6.101563 20.5 C 6.101563 20.5 6 20 6 19.699219 C 6.101563 17.199219 8 13.699219 11 10.800781 Z M 21.300781 21.300781 C 16.5 26.101563 11 27.398438 8.101563 24.601563 C 7.898438 24.398438 7.699219 24.199219 7.5 23.898438 C 7.699219 24 8 24 8.300781 24 C 9.199219 24 10.300781 23.800781 11.398438 23.398438 C 13.800781 22.5 16.398438 20.800781 18.699219 18.5 C 22.199219 15 24.199219 11 24.199219 8.101563 L 24.300781 8.199219 L 24.601563 8.398438 C 27.398438 11.300781 26 16.699219 21.300781 21.300781 Z"></path>
              </svg>
              <div className="absolute -inset-1 bg-yellow-200/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg text-foreground quicksand-font tracking-tight">ORPHEUS AI</span>
            </div>
          </Link>

          {/* Desktop Navigation
          <div className="hidden lg:flex items-center space-x-6"> 
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative px-5 py-3 text-sm font-medium transition-all duration-300 rounded-lg group",
                  "hover:bg-accent/80 hover:text-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2",
                  "hover:after:w-3/4",
                  isActive(item.path) 
                    ? "text-primary bg-primary/10 shadow-sm border border-primary/20 after:w-3/4" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
          </div>

          */}

          {/* Mobile Controls */}
          <div className="flex items-center space-x-3"> {/* Increased spacing */}
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 w-10 p-0 hover:bg-accent/50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced */}
        <div
          className={cn(
            "transform transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? 'max-h-[600px] mb-8 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
          )}
        >
          <div className="px-4 pt-6 pb-6 space-y-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg mt-4 shadow-lg mx-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center justify-between px-5 py-4 text-base font-medium transition-all duration-200 rounded-lg group",
                  "hover:bg-accent/80 hover:text-accent-foreground active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "min-h-[48px]", // Ensuring good touch targets
                  isActive(item.path) 
                    ? "text-primary bg-primary/15 shadow-sm border border-primary/30" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
