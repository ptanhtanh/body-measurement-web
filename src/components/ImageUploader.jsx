import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUploader = ({ onImageSelect, selectedImage, isProcessing }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSelect(e.target.files[0]);
        }
    };

    const validateAndSelect = (file) => {
        if (file.type.match('image.*')) {
            onImageSelect(file);
        } else {
            alert("Please upload a valid image file (PNG, JPG)");
        }
    };

    const clearImage = (e) => {
        e.stopPropagation();
        onImageSelect(null);
    };

    return (
        <div className="w-full">
            <div
                className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 h-[750px] flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md overflow-hidden ${dragActive ? "border-brand-primary bg-brand-primary/10" : "border-white/10 hover:border-white/30"
                    } ${isProcessing ? "opacity-50 pointer-events-none" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />

                <AnimatePresence mode="wait">
                    {!selectedImage ? (
                        <motion.div
                            key="upload-prompt"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            <div className="p-4 rounded-full bg-brand-primary/20 text-brand-primary">
                                <Upload size={32} />
                            </div>
                            <div>
                                <p className="text-white font-medium text-lg">Click or drag to upload</p>
                                <p className="text-white/50 text-sm mt-1">Full-body image (JPG/PNG)</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full h-full flex flex-col items-center"
                        >
                            <div className="relative group w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/40">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                                <button
                                    onClick={clearImage}
                                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X size={18} />
                                </button>
                                <div className="absolute top-2 left-2 flex items-center gap-2 px-2 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-white text-xs">
                                    <CheckCircle2 size={12} />
                                    <span>Ready</span>
                                </div>
                            </div>
                            <p className="mt-4 text-white/70 text-sm bg-black/30 px-3 py-1 rounded-full border border-white/10">
                                {selectedImage.name}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ImageUploader;
