import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Mic, MicOff, Volume2, VolumeX, Settings, Trash2, 
  Download, RefreshCw, X, Sparkles, User, Info, ArrowDown 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { requestJson, authHeaders } from '../../services/api';
import { AISettings } from './AISettings';

export function AIChatWindow({ onClose, user }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your SmartTransit AI Copilot. How can I help you navigate the transit networks today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Settings states
  const [model, setModel] = useState('gemini');
  const [temp, setTemp] = useState(0.7);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [lang, setLang] = useState('en');

  // Speech API refs
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Scroll logic
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Speech Recognition (Speech-to-Text) configuration
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = lang === 'hi' ? 'hi-IN' : lang === 'kn' ? 'kn-IN' : 'en-US';

      rec.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setInputValue(text);
        setIsListening(false);
        toast.success('Voice command recognized.');
      };

      rec.onerror = () => {
        setIsListening(false);
        toast.error('Voice input timed out. Try again.');
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [lang]);

  const handleMicToggle = () => {
    if (!recognitionRef.current) {
      toast.error('Speech recognition not supported in this browser.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
      toast('Listening... Speak your command.', { icon: '🎙️' });
    }
  };

  // Text-To-Speech synthesis read-aloud
  const speakText = (text) => {
    if (!ttsEnabled) return;
    window.speechSynthesis?.cancel(); // Cancel previous
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*`]/g, ''));
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'kn' ? 'kn-IN' : 'en-US';
    window.speechSynthesis?.speak(utterance);
  };

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;
    
    // Add user bubble
    const userBubble = { role: 'user', text };
    setMessages(prev => [...prev, userBubble]);
    setInputValue('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const data = await requestJson('/api/ai/chat', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({
          message: text,
          page: window.location.pathname,
        }),
      });

      const reply = data?.reply || 'I apologize, I could not query transit logs right now.';
      
      // Add assistant bubble
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      speakText(reply);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: '⚠️ Connection failed. Gemini Fallback mode inactive.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      { role: 'assistant', text: 'Conversation history cleared. Let me know if you need commute directions.' }
    ]);
    window.speechSynthesis?.cancel();
    toast.success('Logs purged.');
  };

  const handleExport = () => {
    const textContent = messages.map(m => `[${m.role.toUpperCase()}]\n${m.text}\n`).join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'smarttransit-ai-session.txt';
    link.click();
    toast.success('Logs exported.');
  };

  const suggestionChips = [
    'How do I apply for a pass?',
    'Plan fastest journey route',
    'Why did my payment fail?',
    'Summarize my dashboard stats',
  ];

  return (
    <div className="w-full max-w-md h-[540px] rounded-3xl border border-white/[0.08] bg-slate-950/90 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col text-xs text-left relative z-50">
      
      {/* Header bar */}
      <div className="p-4 border-b border-white/[0.06] flex justify-between items-center bg-slate-900/40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-white font-bold leading-none">SmartTransit Copilot</h4>
            <span className="text-[8px] text-pink-400 font-bold uppercase tracking-wider block mt-1">Context Aware Gemini Assistant</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1.5 rounded-lg border transition-colors focus:outline-none ${
              showSettings ? 'border-pink-500/20 bg-pink-500/10 text-pink-400' : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
            }`}
            title="AI Config"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white transition-colors focus:outline-none"
            title="Minimize Assistant"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Area: Settings vs Messaging feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative min-h-0">
        <AnimatePresence mode="wait">
          {showSettings ? (
            <motion.div
              key="settings"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <AISettings
                model={model} onModelChange={setModel}
                temp={temp} onTempChange={setTemp}
                ttsEnabled={ttsEnabled} onTtsToggle={setTtsEnabled}
                lang={lang} onLangChange={setLang}
              />
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Message bubbles list */}
              {messages.map((m, idx) => {
                const isUser = m.role === 'user';
                return (
                  <div key={idx} className={`flex gap-3.5 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse text-right' : ''}`}>
                    <div className={`p-2 rounded-lg border shrink-0 h-fit ${
                      isUser ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' : 'bg-slate-900 border-white/5 text-slate-400'
                    }`}>
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                    </div>
                    
                    <div className="space-y-1.5 text-left">
                      <div className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed border ${
                        isUser 
                          ? 'bg-gradient-to-tr from-pink-600/20 to-rose-500/10 border-pink-500/20 text-white rounded-tr-none'
                          : 'bg-slate-900/40 border-slate-800 text-slate-300 rounded-tl-none shadow-md'
                      }`}>
                        {/* Render simple markdown details */}
                        <div className="whitespace-pre-line font-medium">{m.text}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Thinking animations overlay */}
              {loading && (
                <div className="flex gap-3.5 items-center">
                  <div className="p-2 rounded-lg bg-slate-900 border border-white/5 text-slate-400 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-pink-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest animate-pulse">Copilot thinking...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestion Chips and inputs */}
      {!showSettings && (
        <div className="p-4 border-t border-white/[0.06] bg-slate-950/90 space-y-3 shrink-0">
          
          {/* Quick chip options */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/20 hover:border-slate-700 transition-colors text-[9px] font-bold text-slate-400 hover:text-white whitespace-nowrap focus:outline-none"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Form input bar */}
          <div className="flex gap-2 relative">
            <button
              onClick={handleMicToggle}
              className={`p-2.5 rounded-xl border transition-all focus:outline-none flex items-center justify-center ${
                isListening
                  ? 'border-pink-500 bg-pink-500/10 text-pink-400 animate-pulse'
                  : 'border-slate-800 bg-slate-900/10 text-slate-500 hover:text-white'
              }`}
              title="Voice Speech Recognition Input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder="Ask anything (e.g. Fastest route stops)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="w-full text-xs px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-pink-500 focus:outline-none rounded-xl text-white font-semibold placeholder-slate-700 pr-10"
            />

            <button
              onClick={() => handleSend()}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors focus:outline-none"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Assistant Sub controls: clear, export */}
          <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold uppercase tracking-wider pt-2 border-t border-white/[0.03]">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3 text-slate-600" /> Page Context: {window.location.pathname.replace('/','')}
            </span>
            <div className="flex gap-3">
              <button onClick={handleExport} className="hover:text-white flex items-center gap-1 focus:outline-none">
                <Download className="w-3 h-3" /> Export
              </button>
              <button onClick={handleClear} className="hover:text-red-400 flex items-center gap-1 focus:outline-none">
                <Trash2 className="w-3 h-3 text-red-500" /> Purge
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
export default AIChatWindow;
