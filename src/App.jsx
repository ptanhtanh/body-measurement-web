import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap } from 'lucide-react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import MeasurementResults from './components/MeasurementResults';
import BodyMeshViewer from './components/BodyMeshViewer';
import { inferMeasurements } from './services/api';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [height, setHeight] = useState('176');
  const [weight, setWeight] = useState('65');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSelect = useCallback((image) => {
    setSelectedImage(image);
    setResult(null);
    setError(null);
  }, []);

  const handleStartInference = async () => {
    if (!selectedImage) return;

    if (!height || !weight || height <= 0 || weight <= 0) {
      setError("Please enter valid height and weight values.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const data = await inferMeasurements(selectedImage, height, weight);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col pb-12 overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full max-w-[1800px] mx-auto px-4 lg:px-12">
        <div className="flex flex-col gap-8">

          {/* Top Control Bar */}
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-6 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10"
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black text-white tracking-tight">AI Measurement</h2>
              <p className="text-white/40 text-sm font-medium">Professional Body Measurement & 3D Reconstruction</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 flex-1 max-w-4xl justify-end">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Height (cm)</span>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-brand-primary transition-all text-center"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Weight (kg)</span>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-brand-primary transition-all text-center"
                  />
                </div>
              </div>

              <div className="h-10 w-[1px] bg-white/10 hidden sm:block"></div>

              <button
                onClick={handleStartInference}
                disabled={!selectedImage || isProcessing}
                className={`px-8 py-3 rounded-xl flex items-center justify-center gap-3 font-black transition-all min-w-[240px] ${!selectedImage || isProcessing
                  ? "bg-white/5 text-white/20 cursor-not-allowed"
                  : "bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} fill="currentColor" />
                    <span>Start Inference</span>
                  </>
                )}
              </button>
            </div>
          </motion.section>

          {error && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-red-400 text-sm text-center font-bold bg-red-400/10 py-3 rounded-2xl border border-red-400/20"
            >
              {error}
            </motion.p>
          )}

          {/* Main Visual Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                isProcessing={isProcessing}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <BodyMeshViewer meshUrl={result?.mesh_url} />
            </motion.div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-3xl p-8 shadow-2xl border border-white/10"
              >
                <MeasurementResults data={result} />
              </motion.section>
            )}
          </AnimatePresence>

        </div>
      </main>

      <footer className="mt-auto pt-12 pb-6 text-center text-white/20 text-[10px] uppercase tracking-widest font-bold">
        &copy; 2026 Tailor AI Systems. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
