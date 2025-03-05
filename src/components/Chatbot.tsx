
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const defaultMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your Skill Links assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        'help': 'I can help you find skilled professionals, navigate our website, understand how our service works, or answer questions about Skill Links.',
        'find': 'To find a professional, you can use the search bar at the top of the page or browse by category. You can filter by location, ratings, and availability.',
        'book': 'To book a service, first find a professional you like, then click on their profile and use the "Contact" button to discuss your needs. You can also submit a job request and receive quotes.',
        'payment': 'We support various payment methods including credit/debit cards and online banking. Payments are secure and only released to professionals once you confirm the job is complete.',
        'review': 'After a service is completed, you can leave a review on the professional\'s profile. Honest reviews help maintain the quality of our platform.',
        'problem': 'If you encounter any issues with a service, please contact the professional directly first. If you can\'t resolve the issue, our customer support team is here to help.',
        'account': 'You can manage your account by clicking on your profile icon in the top right corner. From there, you can update your information, view your history, and manage your settings.',
        'professional': 'If you\'re a skilled professional looking to offer your services, sign up and select "Service Provider" during registration. You\'ll need to complete your profile and verification process before you can start receiving job requests.'
      };
      
      // Find the most relevant response
      let botResponse = 'I\'m not sure how to help with that. Could you try asking something about finding professionals, booking services, payments, or how to become a professional on our platform?';
      
      // Simple keyword matching
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (newMessage.toLowerCase().includes(keyword)) {
          botResponse = response;
          break;
        }
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <>
      {!isOpen && (
        <Button 
          className="fixed bottom-4 right-4 rounded-full h-16 w-16 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare size={24} />
        </Button>
      )}
      
      {isOpen && (
        <Card className={`fixed bottom-4 right-4 w-80 shadow-lg transition-all duration-200 ${isMinimized ? 'h-16' : 'sm:w-96 h-[70vh] max-h-[600px]'}`}>
          <CardHeader className="p-4 flex flex-row items-center justify-between border-b">
            <CardTitle className="text-base font-medium flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              Skill Links Assistant
            </CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
              >
                <X size={18} />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-4 overflow-y-auto h-full max-h-[calc(70vh-120px)] flex-grow">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`rounded-lg p-3 max-w-[80%] ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="p-4 border-t">
                <div className="flex w-full space-x-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={isTyping}>
                    <Send size={18} />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default Chatbot;
