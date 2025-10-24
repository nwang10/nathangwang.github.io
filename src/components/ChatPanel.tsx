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
      // Show initial greeting with a friendly touch
      const greetings = [
        "Hey! 👋 I'm Nathan's AI assistant. Think of me as the friendly guide to his work. What catches your interest?",
        "Welcome! I'm here to help you explore Nathan's projects, experience, and skills. What would you like to know?",
        "Hi there! I've got the inside scoop on Nathan's work. Ask me anything!"
      ];
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];

      setTimeout(() => {
        addAssistantMessage(greeting, getQuickReplies());
      }, 400);
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

    // Realistic typing delay based on message length
    // Average typing speed: ~50 words per minute = ~250 chars per minute
    const baseDelay = 600;
    const charDelay = text.length * 8; // 8ms per character
    const typingDelay = Math.min(baseDelay + charDelay, 2500); // Cap at 2.5 seconds

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
    }, typingDelay);
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
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    delay: index * 0.05
                  }}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md ${
                      message.sender === 'user'
                        ? 'rounded-br-none'
                        : 'rounded-bl-none'
                    }`}
                    style={{
                      backgroundColor: message.sender === 'user' ? 'var(--color-accent)' : 'var(--color-surface)',
                      color: message.sender === 'user' ? 'white' : 'var(--color-text)',
                      border: message.sender === 'assistant' ? '1px solid var(--color-border)' : 'none'
                    }}
                  >
                    <div className="text-sm whitespace-pre-line">
                      {message.text.split('```').map((part, i) => {
                        if (i % 2 === 1) {
                          // Code block
                          const lines = part.split('\n');
                          const code = lines.slice(1).join('\n');
                          return (
                            <pre
                              key={i}
                              className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs my-2"
                            >
                              <code>{code}</code>
                            </pre>
                          );
                        }
                        // Regular text with markdown bold support
                        return part.split(/(\*\*.*?\*\*)/).map((segment, j) => {
                          if (segment.startsWith('**') && segment.endsWith('**')) {
                            return <strong key={`${i}-${j}`}>{segment.slice(2, -2)}</strong>;
                          }
                          return <span key={`${i}-${j}`}>{segment}</span>;
                        });
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Follow-up chips */}
              {messages.length > 0 && messages[messages.length - 1].followUp && !isTyping && (
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                >
                  {messages[messages.length - 1].followUp!.map((chip, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickReply(chip)}
                      className="px-3 py-2 rounded-full text-sm font-medium no-underline"
                      style={{
                        border: '2px solid var(--color-accent)',
                        color: 'var(--color-accent)',
                        backgroundColor: 'transparent',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-accent)';
                      }}
                    >
                      {chip}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    className="px-4 py-3 rounded-2xl rounded-bl-none flex items-center space-x-2 shadow-md"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                        animate={{ y: [0, -6, 0], opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                        animate={{ y: [0, -6, 0], opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                        animate={{ y: [0, -6, 0], opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-xs ml-2" style={{ color: 'var(--color-text-muted)' }}>
                      Nathan's assistant is typing...
                    </span>
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
