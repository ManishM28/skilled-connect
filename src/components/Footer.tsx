
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border/60">
      <div className="container px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <a href="/" className="text-2xl font-display font-bold text-foreground">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Skilled</span>
                <span className="text-foreground">Connect</span>
              </a>
            </div>
            <p className="text-muted-foreground mb-6">
              Connecting skilled professionals with customers for quality service.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook size={18} />} />
              <SocialLink href="#" icon={<Twitter size={18} />} />
              <SocialLink href="#" icon={<Instagram size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-display font-bold text-lg mb-6">For Customers</h3>
            <ul className="space-y-4">
              <FooterLink href="#">Find Professionals</FooterLink>
              <FooterLink href="#">How It Works</FooterLink>
              <FooterLink href="#">Review a Professional</FooterLink>
              <FooterLink href="#">Help Center</FooterLink>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-display font-bold text-lg mb-6">For Professionals</h3>
            <ul className="space-y-4">
              <FooterLink href="#">Join As Professional</FooterLink>
              <FooterLink href="#">Success Stories</FooterLink>
              <FooterLink href="#">Pro Resources</FooterLink>
              <FooterLink href="#">Partner Program</FooterLink>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-display font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground" />
                <span>support@skilledconnect.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground" />
                <span>123 Market St, San Francisco, CA 94105</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/60 py-8 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {currentYear} SkilledConnect. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <a href={href} className="text-muted-foreground hover:text-primary transition-colors">
      {children}
    </a>
  </li>
);

const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
  <a 
    href={href}
    className={cn(
      "flex items-center justify-center w-10 h-10 rounded-full",
      "bg-secondary/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
      "transition-colors duration-200"
    )}
  >
    {icon}
  </a>
);

export default Footer;
