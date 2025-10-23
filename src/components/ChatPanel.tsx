import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { matchIntent, getQuickReplies } from '../lib/intent';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  followUp?: string[];
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Show initial greeting with typewriter effect
      setTimeout(() => {
        addAssistantMessage("Hey, I'm Nathan! What do you want to explore?", getQuickReplies());
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const addAssistantMessage = (text: string, followUp?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          sender: 'assistant',
          followUp
        }
      ]);
      setIsTyping(false);
    }, 500);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: 'user'
      }
    ]);

    setInput('');

    // Get AI response
    const response = matchIntent(text);
    addAssistantMessage(response.response, response.followUp);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Chat panel */}
          <motion.div
            className="fixed bottom-6 right-6 w-96 h-[32rem] glass-effect rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {/* Header */}
            <div
              className="p-4 flex justify-between items-center border-b"
              style={{ borderColor: 'var(--color-secondary)' }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  NW
                </div>
                <div>
                  <h3 className="font-bold">Nathan's AI Assistant</h3>
                  <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>
                    Ask me anything!
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2 transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'rounded-br-none'
                        : 'rounded-bl-none'
                    }`}
                    style={{
                      backgroundColor: message.sender === 'user' ? 'var(--color-accent)' : 'var(--color-secondary)',
                      color: 'white'
                    }}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Follow-up chips */}
              {messages.length > 0 && messages[messages.length - 1].followUp && (
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {messages[messages.length - 1].followUp!.map((chip, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(chip)}
                      className="px-3 py-1 rounded-full text-sm border-2 transition-all hover:scale-105"
                      style={{
                        borderColor: 'var(--color-accent)',
                        color: 'var(--color-accent)'
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div
                    className="px-4 py-2 rounded-2xl rounded-bl-none flex space-x-1"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-4 border-t"
              style={{ borderColor: 'var(--color-secondary)' }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex space-x-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{
                    borderColor: 'var(--color-secondary)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)'
                  }}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full font-semibold transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'white'
                  }}
                  disabled={!input.trim()}
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
