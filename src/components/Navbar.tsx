import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import UserMenu from './UserMenu';
import { Info, FileText } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-display font-bold text-primary">SkilledConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <Link
              to="/professionals"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Find Professionals
            </Link>
            <Link to="/about" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
              <Info className="w-4 h-4 mr-1" />
              About Us
            </Link>
            <Link to="/privacy" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
              <FileText className="w-4 h-4 mr-1" />
              Privacy
            </Link>
            <UserMenu />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <UserMenu />
            <Button
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg">
          <div className="container px-6 py-4 flex flex-col space-y-4">
            <a 
              href="#categories" 
              className="py-2 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </a>
            <a 
              href="#how-it-works" 
              className="py-2 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <Link
              to="/professionals"
              className="py-2 text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Professionals
            </Link>
            <Link 
              to="/about" 
              className="py-2 text-base font-medium hover:text-primary transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Info className="w-4 h-4 mr-2" />
              About Us
            </Link>
            <Link 
              to="/privacy" 
              className="py-2 text-base font-medium hover:text-primary transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText className="w-4 h-4 mr-2" />
              Privacy Policy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
