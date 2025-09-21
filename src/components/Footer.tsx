import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="col-span-6  ">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                ORPHEUS AI
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Transforming agriculture through AI-powered soil restoration.
              Building a future where clean farming meets profitable
              sustainability.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-3">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 mb-8">
              <li>
                <Link
                  to="/systems"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/manifesto"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Team
                </Link>
              </li>
            </ul>
            {/* Contact Info */}
            <div className="col-span-2">
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <a
                  href="https://www.linkedin.com/company/orpheustech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>

          
          <div className="col-span-3">
            <h3 className="font-semibold mb-4">Offerings</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/food"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Food
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Commodities
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Industrials
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 OrpheusAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
