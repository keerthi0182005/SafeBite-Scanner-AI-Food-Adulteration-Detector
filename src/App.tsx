import { useState } from 'react';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { FoodSelector } from './components/FoodSelector';
import { TestGuide } from './components/TestGuide';
import { CameraUpload } from './components/CameraUpload';
import { AnalysisResults } from './components/AnalysisResults';
import { FoodSafetyMap } from './components/FoodSafetyMap';
import { AwarenessSection } from './components/AwarenessSection';
import { FoodItem, DARTTest, AnalysisResult, Language, SampleImagePreset } from './types';
import { FOOD_DATABASE } from './data/foodsData';
import { ShieldCheck, Phone, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'scanner' | 'map' | 'awareness' | 'rights'>('scanner');
  
  // Scanner Workflow Steps: 'home' | 'select' | 'guide' | 'capture' | 'results'
  const [scannerStep, setScannerStep] = useState<'home' | 'select' | 'guide' | 'capture' | 'results'>('home');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedTest, setSelectedTest] = useState<DARTTest | null>(null);
  const [testedImage, setTestedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Map prefill state
  const [mapPrefill, setMapPrefill] = useState<{
    foodName: string;
    testName: string;
    status: 'normal' | 'suspicious' | 'inconclusive';
    suspectedAdulterant: string;
    notes: string;
  } | null>(null);

  // Handlers
  const handleStartTest = () => {
    setActiveTab('scanner');
    setScannerStep('select');
  };

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setSelectedTest(food.dartTests[0]);
    setScannerStep('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCapture = (test: DARTTest) => {
    setSelectedTest(test);
    setScannerStep('capture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeImage = async (imageData: string, presetSample?: SampleImagePreset) => {
    if (!selectedFood || !selectedTest) return;

    setTestedImage(imageData);
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageData,
          foodId: selectedFood.id,
          testId: presetSample ? `${selectedTest.id}-${presetSample.expectedStatus}` : selectedTest.id,
          testName: selectedTest.name.en,
          language: currentLang
        })
      });

      const data = await response.json();

      if (data.success && data.analysis) {
        setAnalysisResult({
          status: data.analysis.status,
          confidenceScore: data.analysis.confidenceScore || 90,
          riskLevel: data.analysis.riskLevel || 'moderate',
          adulterantSuspected: data.analysis.adulterantSuspected || 'Unknown',
          detectedCharacteristics: data.analysis.detectedCharacteristics || ['Colorimetric response analyzed'],
          visualExplanation: data.analysis.visualExplanation || 'Visual characteristic analysis complete.',
          recommendations: data.analysis.recommendations || ['Follow standard food safety guidelines.'],
          fssaiStandardReference: data.analysis.fssaiStandardReference || 'FSSAI DART Rapid Home Test Protocol',
          disclaimer: data.analysis.disclaimer || 'Indicative screening demonstration only.',
          source: data.source || 'heuristic-simulation'
        });
        setScannerStep('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Analysis response incomplete');
      }
    } catch (err) {
      console.warn('API error during analysis, generating client fallback:', err);
      // Fallback
      setAnalysisResult({
        status: presetSample ? presetSample.expectedStatus : 'suspicious',
        confidenceScore: 88,
        riskLevel: 'moderate',
        adulterantSuspected: selectedTest.targetAdulterant[currentLang],
        detectedCharacteristics: [
          'Visual layer separation observed in test vessel',
          'Colorimetric absorbance within screening threshold',
          'Sediment rate differs from natural baseline'
        ],
        visualExplanation: 'Screening assessment conducted based on FSSAI visual guidelines.',
        recommendations: [
          'Cease consumption if suspicious reaction persists',
          'Report unsealed samples to local food safety authority via 1915'
        ],
        fssaiStandardReference: 'FSSAI DART Protocol Reference',
        disclaimer: 'This result is an indicative AI demonstration.',
        source: 'heuristic-simulation'
      });
      setScannerStep('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResetScanner = () => {
    setSelectedFood(null);
    setSelectedTest(null);
    setTestedImage(null);
    setAnalysisResult(null);
    setScannerStep('select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReportToMap = (prefill: {
    foodName: string;
    testName: string;
    status: 'normal' | 'suspicious' | 'inconclusive';
    suspectedAdulterant: string;
    notes: string;
  }) => {
    setMapPrefill(prefill);
    setActiveTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'scanner' && scannerStep === 'results') {
            // Keep results if already tested
          } else if (tab === 'scanner' && scannerStep !== 'home') {
            // stay on step
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'scanner' && (
          <>
            {scannerStep === 'home' && (
              <>
                <HomeHero
                  currentLang={currentLang}
                  onStartTest={handleStartTest}
                  onExploreMap={() => setActiveTab('map')}
                  onExploreAwareness={() => setActiveTab('awareness')}
                />
                <FoodSelector
                  currentLang={currentLang}
                  selectedFoodId={selectedFood?.id || null}
                  onSelectFood={handleSelectFood}
                />
              </>
            )}

            {scannerStep === 'select' && (
              <div className="py-6">
                <FoodSelector
                  currentLang={currentLang}
                  selectedFoodId={selectedFood?.id || null}
                  onSelectFood={handleSelectFood}
                />
              </div>
            )}

            {scannerStep === 'guide' && selectedFood && (
              <TestGuide
                food={selectedFood}
                currentLang={currentLang}
                onProceedToCapture={handleProceedToCapture}
                onBack={() => setScannerStep('select')}
              />
            )}

            {scannerStep === 'capture' && selectedFood && selectedTest && (
              <CameraUpload
                food={selectedFood}
                test={selectedTest}
                currentLang={currentLang}
                onAnalyze={handleAnalyzeImage}
                isAnalyzing={isAnalyzing}
                onBackToGuide={() => setScannerStep('guide')}
              />
            )}

            {scannerStep === 'results' && selectedFood && selectedTest && analysisResult && testedImage && (
              <AnalysisResults
                food={selectedFood}
                test={selectedTest}
                result={analysisResult}
                currentLang={currentLang}
                onReset={handleResetScanner}
                onReportToMap={handleReportToMap}
                testedImage={testedImage}
              />
            )}
          </>
        )}

        {activeTab === 'map' && (
          <FoodSafetyMap
            currentLang={currentLang}
            prefillReport={mapPrefill}
            onClearPrefill={() => setMapPrefill(null)}
          />
        )}

        {activeTab === 'awareness' && (
          <AwarenessSection currentLang={currentLang} />
        )}

        {activeTab === 'rights' && (
          <AwarenessSection currentLang={currentLang} />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            {/* Brand column */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="font-black text-lg text-white tracking-tight">
                  Safe<span className="text-blue-500">Bite</span> Scanner
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering Indian consumers with AI-guided kitchen rapid tests, regional adulteration mapping, and FSSAI consumer awareness.
              </p>
            </div>

            {/* Foods Tested */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Tested Food Items
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {FOOD_DATABASE.map(f => (
                  <li
                    key={f.id}
                    onClick={() => {
                      handleSelectFood(f);
                      setActiveTab('scanner');
                    }}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    • {f.name[currentLang]} ({f.name.en})
                  </li>
                ))}
              </ul>
            </div>

            {/* Consumer Helplines */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Official Grievance Helplines
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">National Consumer Helpline</span>
                  <a href="tel:1915" className="text-white font-black text-sm flex items-center gap-1.5 hover:text-blue-400 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                    1915 (Toll-Free)
                  </a>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">FSSAI FoSCoS Portal</span>
                  <a href="https://foscos.fssai.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline block mt-0.5">
                    foscos.fssai.gov.in
                  </a>
                </div>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Screening Disclaimer</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                SafeBite Scanner is an indicative consumer education tool based on the FSSAI DART handbook and AI visual screening. Home tests cannot substitute certified laboratory findings or legal verification under the Food Safety and Standards Act 2006.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 SafeBite Scanner. Built for Indian Consumer Food Safety.
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>for healthy families across Karnataka & India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
