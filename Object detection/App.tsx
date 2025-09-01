import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Zap, Target } from 'lucide-react';
import VideoFeed from './components/VideoFeed';
import ControlPanel from './components/ControlPanel';
import ChatBot from './components/ChatBot';
import { useObjectDetection } from './hooks/useObjectDetection';

function App() {
  const { isLoading, detectedObjects, stats, detectObjects } = useObjectDetection();
  const [showLabels, setShowLabels] = useState(true);
  const [showConfidence, setShowConfidence] = useState(true);
  const [showTrackingIds, setShowTrackingIds] = useState(true);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  // Detection loop
  useEffect(() => {
    if (!videoElement || isLoading) return;

    const intervalId = setInterval(() => {
      detectObjects(videoElement);
    }, 100); // 10 FPS detection rate

    return () => clearInterval(intervalId);
  }, [videoElement, isLoading, detectObjects]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
              <Target className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Object Detection & Tracking
              </h1>
              <p className="text-gray-400 text-sm">
                Real-time computer vision powered by TensorFlow.js
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Feed - Main Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Eye className="text-blue-400" size={20} />
                Live Detection Feed
              </h2>
              <p className="text-gray-400 text-sm">
                Select a video source to begin real-time object detection and tracking
              </p>
            </div>
            
            <VideoFeed
              detectedObjects={detectedObjects}
              onVideoReady={setVideoElement}
              showLabels={showLabels}
              showConfidence={showConfidence}
              showTrackingIds={showTrackingIds}
            />
          </motion.div>

          {/* Control Panel - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <ControlPanel
              showLabels={showLabels}
              showConfidence={showConfidence}
              showTrackingIds={showTrackingIds}
              onToggleLabels={() => setShowLabels(!showLabels)}
              onToggleConfidence={() => setShowConfidence(!showConfidence)}
              onToggleTrackingIds={() => setShowTrackingIds(!showTrackingIds)}
              stats={stats}
              isModelLoading={isLoading}
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Powerful Detection Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Detection</h3>
              <p className="text-gray-400 text-sm">
                Advanced COCO-SSD model detects 80+ object classes with high accuracy
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Tracking</h3>
              <p className="text-gray-400 text-sm">
                Persistent object tracking with unique IDs and trajectory visualization
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Eye size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Interface</h3>
              <p className="text-gray-400 text-sm">
                Customizable display options with real-time performance metrics
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Chat Assistant */}
      <ChatBot />
    </div>
  );
}

export default App;