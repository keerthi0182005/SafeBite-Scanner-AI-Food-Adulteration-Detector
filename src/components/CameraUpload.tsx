import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Upload, RotateCcw, Sparkles, Check, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { FoodItem, DARTTest, SampleImagePreset, Language } from '../types';
import { UI_TRANSLATIONS } from '../translations/translations';

interface CameraUploadProps {
  food: FoodItem;
  test: DARTTest;
  currentLang: Language;
  onAnalyze: (imageData: string, presetSample?: SampleImagePreset) => void;
  isAnalyzing: boolean;
  onBackToGuide: () => void;
}

export const CameraUpload: React.FC<CameraUploadProps> = ({
  food,
  test,
  currentLang,
  onAnalyze,
  isAnalyzing,
  onBackToGuide
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  const [activeMode, setActiveMode] = useState<'upload' | 'camera' | 'preset'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<SampleImagePreset | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera helper
  const stopCameraStream = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  }, [cameraStream]);

  // Start live camera
  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    stopCameraStream();
    setCameraError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported by your current browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setActiveMode('camera');
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unable to access device camera';
      console.warn('Camera error:', errorMsg);
      setCameraError(t.cameraUnavailable);
    }
  };

  // Flip camera between front and back
  const flipCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  // Take photo from video stream
  const captureSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      setSelectedPreset(null);
      stopCameraStream();
      setActiveMode('upload');
    }
  };

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setSelectedPreset(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Preset sample selection
  const handleSelectPreset = (preset: SampleImagePreset) => {
    setSelectedPreset(preset);
    setSelectedImage(preset.dataUrl);
    stopCameraStream();
  };

  // Trigger analysis
  const handleStartAnalysis = () => {
    if (!selectedImage) return;
    onAnalyze(selectedImage, selectedPreset || undefined);
  };

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToGuide}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{food.name[currentLang]} Protocol</span>
        </button>

        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
          Step 2 of 3: Photo Capture
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.captureHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t.captureSubheading}
          </p>
        </div>

        {/* Input Mode Selector Bar */}
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              stopCameraStream();
              setActiveMode('upload');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'upload'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">{t.uploadGallery}</span>
            <span className="sm:hidden">Gallery</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('camera');
              startCamera();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'camera'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">{t.startCamera}</span>
            <span className="sm:hidden">Camera</span>
          </button>

          <button
            onClick={() => {
              stopCameraStream();
              setActiveMode('preset');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'preset'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Demo Presets</span>
            <span className="sm:hidden">Samples</span>
          </button>
        </div>

        {/* Active Mode Viewport */}
        {activeMode === 'camera' && (
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-4/3 max-h-[460px] flex flex-col items-center justify-center">
            {cameraError ? (
              <div className="p-6 text-center max-w-md space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <p className="text-xs sm:text-sm text-slate-300">
                  {cameraError}
                </p>
                <button
                  onClick={() => setActiveMode('upload')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
                >
                  Switch to File Upload
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Camera Overlay Reticle */}
                <div className="absolute inset-8 border-2 border-dashed border-white/50 rounded-2xl pointer-events-none flex flex-col items-center justify-between p-4">
                  <span className="bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs">
                    Align your test glass or reaction within this guide
                  </span>
                  <div className="w-8 h-8 border-t-2 border-l-2 border-white absolute top-4 left-4" />
                  <div className="w-8 h-8 border-t-2 border-r-2 border-white absolute top-4 right-4" />
                  <div className="w-8 h-8 border-b-2 border-l-2 border-white absolute bottom-4 left-4" />
                  <div className="w-8 h-8 border-b-2 border-r-2 border-white absolute bottom-4 right-4" />
                </div>

                {/* Camera Controls Bar */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 px-4">
                  <button
                    onClick={flipCamera}
                    className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md transition-all"
                    title={t.switchCamera}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>

                  <button
                    onClick={captureSnapshot}
                    className="w-16 h-16 rounded-full bg-white p-1 shadow-lg ring-4 ring-white/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                    title={t.snapPhoto}
                  >
                    <div className="w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white">
                      <Camera className="w-6 h-6" />
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      stopCameraStream();
                      setActiveMode('upload');
                    }}
                    className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md transition-all text-xs font-bold px-3.5"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {activeMode === 'upload' && !selectedImage && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {t.dropZoneText}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {t.supportedFormats}
              </p>
            </div>
          </div>
        )}

        {/* Selected Image Preview Box */}
        {selectedImage && activeMode !== 'camera' && (
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 max-h-[380px] flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Selected Food Test Sample"
                className="max-h-[380px] w-auto object-contain"
              />

              {selectedPreset && (
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Demo Sample: {selectedPreset.label[currentLang]}</span>
                </div>
              )}

              <button
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedPreset(null);
                }}
                className="absolute top-3 right-3 bg-black/75 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/20 transition-colors"
              >
                {t.retakePhoto}
              </button>
            </div>
          </div>
        )}

        {/* Verified Demo Presets Section */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.tryPresetSample}</span>
            </h4>
            <span className="text-[11px] text-slate-400">Instant One-Click Demo</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {food.sampleImages.map((preset) => {
              const isChosen = selectedPreset?.id === preset.id;

              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    isChosen
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-900">
                    <img
                      src={preset.dataUrl}
                      alt={preset.label[currentLang]}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {preset.label[currentLang]}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        preset.expectedStatus === 'suspicious' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {preset.expectedStatus === 'suspicious' ? 'Positive' : 'Normal'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {preset.description[currentLang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button: Trigger AI Analysis */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={handleStartAnalysis}
            disabled={!selectedImage || isAnalyzing}
            className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-md ${
              selectedImage && !isAnalyzing
                ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-blue-600/20 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t.analyzingText}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{t.analyzeButton}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
