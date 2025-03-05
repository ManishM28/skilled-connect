
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const serviceImages = [
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558635839-9caa873e3f0f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % serviceImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [serviceImages.length]);

  return (
    <section className="relative min-h-screen-dynamic pt-24 pb-16 md:pt-36 overflow-hidden">
      {/* Background images */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center blur-sm"
              style={{ backgroundImage: `url(${serviceImages[currentImageIndex]})` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container px-6 md:px-10 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6">
              <span className="block">Find Skilled Professionals</span>
              <span className="block mt-2 text-primary">For Any Project</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          >
            Connect with verified experts in plumbing, electrical work, carpentry, 
            and more — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full mb-8"
          >
            <SearchBar isExpanded />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground"
          >
            <span>Popular:</span>
            <a href="#" className={cn(
              "px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors",
              "text-secondary-foreground font-medium"
            )}>
              Plumbers
            </a>
            <a href="#" className={cn(
              "px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors",
              "text-secondary-foreground font-medium"
            )}>
              Electricians
            </a>
            <a href="#" className={cn(
              "px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors",
              "text-secondary-foreground font-medium"
            )}>
              Painters
            </a>
            <a href="#" className={cn(
              "px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors",
              "text-secondary-foreground font-medium"
            )}>
              Carpenters
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#categories">
          <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
            <ChevronDown className="h-6 w-6" />
          </Button>
        </a>
      </div>
    </section>
  );
};

export default Hero;
