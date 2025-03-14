import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoriesPage from "./pages/Categories";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Chatbot from "./components/Chatbot";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import ProfessionalsList from "./pages/ProfessionalsList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories/:categoryId" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/professional-profile" element={<ProfessionalProfile />} />
            <Route path="/professionals" element={<ProfessionalsList />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
