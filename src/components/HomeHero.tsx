import React from 'react';
import { ArrowRight, CheckCircle2, MapPin, Eye, Zap } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../translations/translations';

interface HomeHeroProps {
  currentLang: Language;
  onStartTest: () => void;
  onExploreMap: () => void;
  onExploreAwareness: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  currentLang,
  onStartTest,
  onExploreMap,
  onExploreAwareness
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/80">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold border border-blue-200">
              <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
              <span>AI-Powered Food Safety for Indian Kitchens</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onStartTest}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.startTestBtn}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onExploreMap}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base rounded-xl border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{t.exploreMapBtn}</span>
              </button>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>FSSAI DART Protocols</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kannada & Hindi Localized</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Camera & Gallery Upload</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Card / Feature Snapshot */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-200/90 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">How SafeBite Works</h3>
                    <p className="text-xs text-slate-500">3 simple steps from your kitchen</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Zero Cost
                </span>
              </div>

              {/* Step Flow Preview */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Choose Staple Food</h4>
                    <p className="text-[11px] text-slate-600">Select Milk, Turmeric, Chilli, Cooking Oil, Rice, or Sugar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Perform 2-Min DART Test</h4>
                    <p className="text-[11px] text-slate-600">Follow official FSSAI rapid steps using clean water, lemon, or paper.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Snap Photo & AI Scan</h4>
                    <p className="text-[11px] text-slate-600">Get colorimetric assessment, risk levels, and clear consumer advisory.</p>
                  </div>
                </div>
              </div>

              {/* Awareness Banner inside Card */}
              <div 
                onClick={onExploreAwareness}
                className="cursor-pointer p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between group hover:border-amber-300 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <div>
                    <div className="text-xs font-bold text-amber-900 group-hover:text-amber-800">
                      Learn About Metanil & Argemone Risks
                    </div>
                    <div className="text-[10px] text-amber-700">
                      View FSSAI Adulteration Encyclopedia & Helpline
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Stats Highlights Bar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-black text-xl">
              6
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">{t.statTestsCount}</div>
              <div className="text-xs text-slate-500">{t.statTestsDesc}</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-black text-sm">
              क/ಕ
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">{t.statAccuracy}</div>
              <div className="text-xs text-slate-500">{t.statAccuracyDesc}</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-black text-xl">
              1915
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">{t.statSafety}</div>
              <div className="text-xs text-slate-500">{t.statSafetyDesc}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
