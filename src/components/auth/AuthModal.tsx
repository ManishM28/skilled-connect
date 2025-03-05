
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Skill Links</DialogTitle>
          <DialogDescription>
            Connect with skilled professionals or offer your services.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm onSuccess={onClose} />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm onSuccess={() => setActiveTab('login')} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
