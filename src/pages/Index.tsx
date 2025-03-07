import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import FeaturedProfessionals from '@/components/FeaturedProfessionals';
import Footer from '@/components/Footer';
import Map from '@/components/Map';
import EmergencySOS from '@/components/EmergencySOS';
import { ArrowDown, ShieldCheck, Zap, MessageSquare, Medal, MapPin } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.closest('a')?.getAttribute('href');
      
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        
        <CategorySection />
        
        <HowItWorksSection />
        
        <FeaturedProfessionals />
        
        <LocationMapSection />
        
        <TestimonialsSection />
        
        <CallToActionSection />
      </main>
      
      <Footer />
      
      <div className="fixed bottom-6 right-6 z-40">
        <EmergencySOS />
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/30 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/10 rounded-full blur-3xl opacity-50 -z-10" />
      
      <div className="container px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            How SkilledConnect Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple process to connect you with the right professional for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-border z-0" />
          
          <StepCard
            number={1}
            title="Describe Your Project"
            description="Tell us what you need help with and we'll connect you with skilled professionals in your area."
            icon={<MessageSquare className="w-6 h-6" />}
          />
          
          <StepCard
            number={2}
            title="Compare Professionals"
            description="Browse profiles, read reviews, and compare quotes from multiple verified professionals."
            icon={<ShieldCheck className="w-6 h-6" />}
          />
          
          <StepCard
            number={3}
            title="Hire & Get It Done"
            description="Choose the best professional for your job, schedule the service, and get your project completed."
            icon={<Zap className="w-6 h-6" />}
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of satisfied customers who found reliable professionals on SkilledConnect
          </p>
          <div className="animate-bounce inline-block">
            <ArrowDown className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ 
  number, 
  title, 
  description, 
  icon 
}: { 
  number: number; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) => {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
          {number}
        </div>
        <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-display font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=180&q=80",
      quote: "Finding a reliable plumber used to be such a hassle. With SkilledConnect, I had three quotes within hours and hired someone the same day!"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=180&q=80",
      quote: "As a small business owner, I needed electrical work done quickly. SkilledConnect helped me find a licensed electrician who could start immediately."
    },
    {
      id: 3,
      name: "Amanda Rodriguez",
      role: "Interior Designer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=180&q=80",
      quote: "I regularly need to hire painters and carpenters for my design projects. SkilledConnect has become my go-to platform for finding quality professionals."
    }
  ];

  return (
    <section className="py-24 bg-accent/30">
      <div className="container px-6 md:px-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from satisfied customers who found the right professional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="glass-card rounded-2xl p-6 hover-lift"
            >
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Medal className="w-8 h-8 text-primary" />
                </div>
                <p className="text-base italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToActionSection = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 -z-0" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/5 rounded-full blur-3xl -z-0" />
      
      <div className="container px-6 md:px-10 max-w-4xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Find the Perfect Professional?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found skilled, reliable help for their projects
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#" 
              className="bg-white text-primary font-medium px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Get Started Now
            </a>
            <a 
              href="#" 
              className="bg-transparent border border-white/50 font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Become a Professional
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const LocationMapSection = () => {
  return (
    <section id="locations" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl opacity-30 -z-10" />
      
      <div className="container px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Find Professionals Near You
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover skilled workers in your area ready to help with your projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <Map />
          </div>
          
          <div className="space-y-6">
            <div className="bg-accent/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Location Services
              </h3>
              <p className="text-muted-foreground mb-4">
                Use our interactive map to find professionals near your location. Click "Locate Me" to see services available in your area.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary/20 p-1 rounded-full mr-2 mt-0.5">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-sm">Find verified professionals nearby</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/20 p-1 rounded-full mr-2 mt-0.5">
                    <Zap className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-sm">Get emergency services quickly</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/20 p-1 rounded-full mr-2 mt-0.5">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-sm">Contact professionals directly</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-destructive/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-destructive flex items-center">
                Emergency Services
              </h3>
              <p className="mb-4">
                Need immediate assistance? Use our Emergency SOS feature to connect with available professionals right away.
              </p>
              <EmergencySOS />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
