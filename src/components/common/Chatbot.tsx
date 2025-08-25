import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm GreenBot 🌱 Your personal plant care assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('water') || message.includes('watering')) {
      return "🌿 Watering tips: Most plants need water when the top inch of soil feels dry. Check your plant's specific needs, but generally water thoroughly until it drains from the bottom. Overwatering is more harmful than underwatering!";
    }
    
    if (message.includes('light') || message.includes('sun')) {
      return "☀️ Light requirements vary by plant! Most houseplants prefer bright, indirect light. South-facing windows provide the most light, while north-facing give gentle light. Would you like specific recommendations for your plant type?";
    }
    
    if (message.includes('yellow') || message.includes('leaves')) {
      return "🍃 Yellow leaves can indicate several things: overwatering (most common), underwatering, nutrient deficiency, or natural aging. Check the soil moisture and adjust your watering schedule accordingly.";
    }
    
    if (message.includes('fertilizer') || message.includes('feed')) {
      return "🌱 During growing season (spring/summer), feed most houseplants every 2-4 weeks with balanced liquid fertilizer. In winter, reduce to monthly or stop feeding as growth slows down.";
    }
    
    if (message.includes('pest') || message.includes('bug')) {
      return "🐛 Common pests include spider mites, aphids, and mealybugs. Inspect leaves regularly, especially undersides. Use insecticidal soap or neem oil for treatment. Quarantine affected plants to prevent spread.";
    }
    
    if (message.includes('membership') || message.includes('plan')) {
      return "✨ Our membership plans include: Bronze (basic care tips), Silver (personalized advice + monthly check-ins), Gold (premium support + emergency rescue service). Would you like details about any specific tier?";
    }
    
    return "Thanks for your question! I'm here to help with plant care, watering schedules, light requirements, pest issues, and our membership services. You can also book a consultation with our expert gardeners through the app!";
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'rotate-180' : 'hover:scale-110'
        } pulse-green`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl z-40 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <div>
                <h3 className="font-semibold">GreenBot</h3>
                <p className="text-xs text-green-100">Your Plant Care Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about plant care..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim()}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;