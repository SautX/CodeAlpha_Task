import React, { useState } from 'react';
import { TranslationInterface } from './components/TranslationInterface';
import { TranslationHistory } from './components/TranslationHistory';
import { Avatar } from './components/Avatar';
import { FloatingElements } from './components/FloatingElements';
import { useTranslation } from './hooks/useTranslation';
import { useClipboard } from './hooks/useClipboard';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { SUPPORTED_LANGUAGES } from './constants/languages';
import { Language } from './types/translation';

function App() {
  const [sourceLanguage, setSourceLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES.find(lang => lang.code === 'en') || SUPPORTED_LANGUAGES[0]
  );
  const [targetLanguage, setTargetLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES.find(lang => lang.code === 'es') || SUPPORTED_LANGUAGES[1]
  );

  const { history, isLoading, error, translateText, clearHistory } = useTranslation();
  const { copied, copyToClipboard } = useClipboard();
  const { speak } = useTextToSpeech();

  const handleTranslate = async (text: string) => {
    try {
      await translateText(text, sourceLanguage, targetLanguage);
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <FloatingElements />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Avatar isThinking={isLoading} />
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Language Translator
                </h1>
                <p className="text-gray-600 mt-2">Break down language barriers with AI-powered translation</p>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Translation Interface */}
          <div className="mb-8">
            <TranslationInterface
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onSourceLanguageChange={setSourceLanguage}
              onTargetLanguageChange={setTargetLanguage}
              onTranslate={handleTranslate}
              isLoading={isLoading}
            />
          </div>

          {/* Translation History */}
          <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-white/90">
            <TranslationHistory
              history={history}
              onCopy={copyToClipboard}
              onSpeak={speak}
              onClearHistory={clearHistory}
              copied={copied}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;