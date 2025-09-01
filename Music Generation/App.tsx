import React, { useState } from 'react';
import { Music, Brain, AudioWaveform as Waveform, MessageCircle, Database, Play } from 'lucide-react';
import DataCollection from './components/DataCollection';
import ModelTraining from './components/ModelTraining';
import MusicGeneration from './components/MusicGeneration';
import Chatbot from './components/Chatbot';

function App() {
  const [activeSection, setActiveSection] = useState('generation');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const sections = [
    { id: 'data', label: 'Data Collection', icon: Database },
    { id: 'training', label: 'Model Training', icon: Brain },
    { id: 'generation', label: 'Music Generation', icon: Music },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'data':
        return <DataCollection />;
      case 'training':
        return <ModelTraining />;
      case 'generation':
        return <MusicGeneration />;
      default:
        return <MusicGeneration />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Image Overlay */}
      <div 
        className="fixed inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Waveform className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Music Studio</h1>
                <p className="text-gray-300 text-sm">Generate music with artificial intelligence</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              <span>AI Assistant</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 ${
                    activeSection === section.id
                      ? 'text-white border-purple-400 bg-white/10'
                      : 'text-gray-300 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {renderActiveSection()}
      </main>

      {/* Chatbot */}
      {isChatbotOpen && (
        <Chatbot onClose={() => setIsChatbotOpen(false)} />
      )}
    </div>
  );
}

export default App;