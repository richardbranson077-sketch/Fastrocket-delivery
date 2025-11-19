'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Minimize2 } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'agent';
    timestamp: Date;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! 👋 How can I help you with your delivery today?',
            sender: 'agent',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate agent response
        setTimeout(() => {
            const responses = [
                "I can help you with that! Could you please provide your tracking number?",
                "Thanks for reaching out. One of our support agents will be with you shortly.",
                "I understand. Let me check the status of your shipment.",
                "Is there anything else I can assist you with today?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newAgentMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: 'agent',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newAgentMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:w-[380px]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-blue-600"></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Support Team</h3>
                                    <p className="text-xs text-blue-100">Typically replies instantly</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 hover:bg-white/20 transition-colors"
                            >
                                <Minimize2 className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="h-[400px] overflow-y-auto bg-slate-50 p-4 dark:bg-slate-900">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.sender === 'user'
                                                    ? 'bg-blue-600 text-white rounded-br-none'
                                                    : 'bg-white text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-200 rounded-bl-none'
                                                }`}
                                        >
                                            {msg.text}
                                            <div className={`mt-1 text-[10px] ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-white px-4 py-3 shadow-sm dark:bg-slate-800">
                                            <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]"></div>
                                            <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]"></div>
                                            <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="border-t bg-white p-4 dark:bg-slate-950 dark:border-slate-800">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors ${isOpen
                        ? 'bg-slate-800 text-white hover:bg-slate-900'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="h-6 w-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageSquare className="h-6 w-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
