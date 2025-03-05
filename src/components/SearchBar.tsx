
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  isExpanded?: boolean;
  showLocation?: boolean;
}

const SearchBar = ({ className, isExpanded = false, showLocation = true }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div 
      className={cn(
        "relative w-full mx-auto transition-all duration-300 ease-in-out",
        isExpanded ? "max-w-5xl" : "max-w-3xl",
        focused ? "ring-2 ring-primary/50" : "ring-1 ring-border/50",
        "bg-white/90 backdrop-blur-md rounded-full shadow-sm",
        className
      )}
    >
      <div className="flex items-center px-6 py-3">
        <Search className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
        
        <input
          type="text"
          placeholder="What service do you need?"
          className="flex-1 bg-transparent border-none focus:outline-none text-base md:text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        
        {showLocation && (
          <>
            <div className="hidden md:block h-10 w-px bg-border mx-4" />
            
            <div className="hidden md:flex items-center flex-1 min-w-[180px]">
              <MapPin className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 bg-transparent border-none focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </div>
          </>
        )}
        
        <button 
          className="ml-2 md:ml-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-6 py-2 transition-colors"
        >
          Search
        </button>
      </div>
      
      {focused && searchTerm && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-border/50 p-2 z-10 animate-fade-up">
          <div className="p-2 hover:bg-accent rounded-lg cursor-pointer">
            <p className="font-medium">Plumbers near you</p>
          </div>
          <div className="p-2 hover:bg-accent rounded-lg cursor-pointer">
            <p className="font-medium">Emergency plumbing services</p>
          </div>
          <div className="p-2 hover:bg-accent rounded-lg cursor-pointer">
            <p className="font-medium">Bathroom fixture installation</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
