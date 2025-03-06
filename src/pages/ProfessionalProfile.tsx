
import { useAuth } from '@/contexts/AuthContext';
import ProfessionalProfileForm from '@/components/professional/ProfessionalProfileForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfessionalProfile = () => {
  const { user, isProfessional } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="container py-12">
      <ProfessionalProfileForm />
    </div>
  );
};

export default ProfessionalProfile;
