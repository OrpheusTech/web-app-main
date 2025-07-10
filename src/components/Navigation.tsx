
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, X, Leaf, User, Settings, LogOut, Bell, CreditCard, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/systems' },
    { name: 'Dashboard', path: '/notfound' },
    { name: 'About', path: '/manifesto' },
    { name: 'Our Team', path: '/team' },
    { name: 'Blogs', path: '/blog' },
    { name: 'Careers', path: '/careers' }
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
        console.log('Navigate to profile');
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
          <Link to="/" className="flex items-center space-x-3 group py-2">
            <div className="relative">
              <Leaf className="h-7 w-7 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground tracking-tight">ORPHEUS AI</span>
              <span className="text-xs text-muted-foreground font-medium -mt-0.5 hidden lg:block">Environmental Intelligence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6"> {/* Increased spacing from space-x-2 to space-x-6 */}
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

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Separator orientation="vertical" className="h-5" />
            
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleProfileAction('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleProfileAction('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleProfileAction('billing')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleProfileAction('help')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleProfileAction('logout')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-3"> {/* Increased spacing */}
            <ThemeToggle />
            
            {/* Mobile Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0"> {/* Increased touch target */}
                  <Avatar className="h-8 w-8"> {/* Slightly larger avatar */}
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleProfileAction('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleProfileAction('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleProfileAction('logout')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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
            "lg:hidden transform transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? 'max-h-[500px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
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
