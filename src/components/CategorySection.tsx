
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CategorySection = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="categories" className="py-24 bg-accent/30">
      <div className="container px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Find Help in Any Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse skilled professionals across a wide range of services for your home or business
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/categories/${category.id}`} key={category.id}>
              <motion.div
                className={cn(
                  "relative overflow-hidden rounded-2xl hover-lift group cursor-pointer",
                  "bg-card border border-border/40 p-6 min-h-[180px] flex flex-col",
                  hoveredCategory === category.id ? "ring-2 ring-primary/50" : ""
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="mb-4 text-3xl">{category.icon}</div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
                
                {/* Gradient overlay that appears on hover */}
                <div 
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  )}
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
