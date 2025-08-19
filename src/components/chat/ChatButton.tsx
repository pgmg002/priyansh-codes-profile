import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatWindow } from './ChatWindow';

export const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 bg-gradient-to-r from-primary to-primary-glow"
          size="lg"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 md:w-96 md:h-[500px]">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};