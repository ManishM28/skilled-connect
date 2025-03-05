
export interface Professional {
  id: string;
  name: string;
  profileImage: string;
  category: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  description: string;
  location: string;
  verificationBadge: boolean;
  specialties: string[];
  availability: string;
  featuredProject?: {
    title: string;
    image: string;
    description: string;
  };
}

export const professionals: Professional[] = [
  {
    id: "pro1",
    name: "Alex Rivera",
    profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    category: "plumbing",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 75,
    description: "Master plumber with over 15 years of experience in residential and commercial projects.",
    location: "San Francisco, CA",
    verificationBadge: true,
    specialties: ["Emergency Repairs", "Fixture Installation", "Pipe Replacement"],
    availability: "Available within 24 hours",
    featuredProject: {
      title: "Complete Bathroom Renovation",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Complete plumbing overhaul for a luxury bathroom renovation project."
    }
  },
  {
    id: "pro2",
    name: "Samantha Chen",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    category: "electrical",
    rating: 5.0,
    reviewCount: 89,
    hourlyRate: 85,
    description: "Licensed electrician specializing in smart home installations and electrical safety upgrades.",
    location: "Seattle, WA",
    verificationBadge: true,
    specialties: ["Smart Home Systems", "Electrical Panel Upgrades", "Lighting Design"],
    availability: "Available next week",
    featuredProject: {
      title: "Smart Home Integration",
      image: "https://images.unsplash.com/photo-1558002038-1055f5d7e0e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Integrated smart lighting, security, and climate control for a modern home."
    }
  },
  {
    id: "pro3",
    name: "Marcus Johnson",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    category: "carpentry",
    rating: 4.8,
    reviewCount: 104,
    hourlyRate: 70,
    description: "Custom furniture maker and finish carpenter with attention to detail and sustainable practices.",
    location: "Portland, OR",
    verificationBadge: true,
    specialties: ["Custom Furniture", "Cabinet Making", "Finish Carpentry"],
    availability: "Available this month",
    featuredProject: {
      title: "Reclaimed Wood Dining Table",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Handcrafted dining table made from locally-sourced reclaimed wood."
    }
  },
  {
    id: "pro4",
    name: "Elena Vasquez",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    category: "painting",
    rating: 4.7,
    reviewCount: 78,
    hourlyRate: 60,
    description: "Professional painter specializing in interior design and color consultation.",
    location: "Austin, TX",
    verificationBadge: true,
    specialties: ["Interior Painting", "Color Consultation", "Decorative Finishes"],
    availability: "Available immediately",
    featuredProject: {
      title: "Modern Apartment Makeover",
      image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Complete interior painting with custom accent walls for a downtown apartment."
    }
  },
  {
    id: "pro5",
    name: "David Park",
    profileImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    category: "landscaping",
    rating: 4.9,
    reviewCount: 92,
    hourlyRate: 80,
    description: "Landscape architect with expertise in sustainable garden design and irrigation systems.",
    location: "Denver, CO",
    verificationBadge: true,
    specialties: ["Sustainable Gardens", "Hardscape Design", "Irrigation Systems"],
    availability: "Limited availability",
    featuredProject: {
      title: "Xeriscaped Front Yard",
      image: "https://images.unsplash.com/photo-1558635839-9caa873e3f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Drought-resistant landscape design with native plants and efficient irrigation."
    }
  },
  {
    id: "pro6",
    name: "Michael Rodriguez",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    category: "hvac",
    rating: 4.8,
    reviewCount: 84,
    hourlyRate: 90,
    description: "HVAC technician specializing in energy-efficient systems and smart climate control.",
    location: "Chicago, IL",
    verificationBadge: true,
    specialties: ["System Installation", "Energy Efficiency", "Smart Climate Control"],
    availability: "Available within 48 hours",
    featuredProject: {
      title: "Whole Home HVAC Upgrade",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Installation of a high-efficiency zoned HVAC system with smart controls."
    }
  }
];
