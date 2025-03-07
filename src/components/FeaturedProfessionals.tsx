
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ProfessionalCard from './ProfessionalCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { getFeaturedProfessionals, ProfessionalWithProfile } from '@/services/professionalService';

const FeaturedProfessionals = () => {
  const featuredRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuredRef, { once: true, amount: 0.2 });
  const [professionals, setProfessionals] = useState<ProfessionalWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch professionals from the service
  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      const data = await getFeaturedProfessionals(7); // Get 7 professionals (3 featured + 4 regular)
      setProfessionals(data);
      setLoading(false);
    };
    
    fetchProfessionals();
  }, []);
  
  // Filter to get only professionals with high ratings for featured section
  const featuredProfessionals = professionals
    .filter(pro => (pro.avg_rating || 0) >= 4.5)
    .slice(0, 3);
  
  // Get the remaining professionals
  const regularProfessionals = professionals
    .filter(pro => !featuredProfessionals.includes(pro))
    .slice(0, 4);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <section id="professionals" className="py-24 bg-background">
        <div className="container px-6 md:px-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Top Rated Professionals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our highest-rated professionals with exceptional reviews and impressive portfolios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-accent/50 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="professionals" className="py-24 bg-background">
      <div className="container px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Top Rated Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our highest-rated professionals with exceptional reviews and impressive portfolios
          </p>
        </div>

        <div ref={featuredRef}>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {featuredProfessionals.map((professional) => (
              <motion.div key={professional.id} variants={itemVariants}>
                <ProfessionalCard professional={professional} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            {regularProfessionals.map((professional) => (
              <motion.div key={professional.id} variants={itemVariants}>
                <ProfessionalCard professional={professional} />
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="group">
              View All Professionals
              <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
