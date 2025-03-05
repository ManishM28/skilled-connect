
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "🔧",
    description: "Fix leaks, install fixtures, and solve plumbing emergencies"
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "⚡",
    description: "Wiring, lighting installation, and electrical repairs"
  },
  {
    id: "carpentry",
    name: "Carpentry",
    icon: "🔨",
    description: "Custom furniture, repairs, and woodworking projects"
  },
  {
    id: "painting",
    name: "Painting",
    icon: "🖌️",
    description: "Interior and exterior painting for homes and businesses"
  },
  {
    id: "landscaping",
    name: "Landscaping",
    icon: "🌱",
    description: "Garden design, lawn care, and outdoor maintenance"
  },
  {
    id: "cleaning",
    name: "Cleaning",
    icon: "✨",
    description: "Deep cleaning, regular maintenance, and specialized cleaning services"
  },
  {
    id: "hvac",
    name: "HVAC",
    icon: "❄️",
    description: "Heating, ventilation, and air conditioning installation and repair"
  },
  {
    id: "roofing",
    name: "Roofing",
    icon: "🏠",
    description: "Roof installation, repair, and maintenance services"
  }
];
