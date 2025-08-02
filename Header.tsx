import React from 'react';
import { Globe, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
            <Globe className="w-8 h-8 text-white animate-pulse" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" />
        </div>
      </div>
      
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
        LinguaBridge
      </h1>
      
      <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
        Break down language barriers with AI-powered translation. Connect with the world, one word at a time.
      </p>
      
      <div className="flex items-center justify-center gap-6 mt-8">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white/80 text-sm">100+ Languages</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-white/80 text-sm">AI Assistant</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-white/80 text-sm">Voice Support</span>
        </div>
      </div>
    </header>
  );
}