import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  AlertOctagon,
  Scale,
  Phone,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { ADULTERANT_ENCYCLOPEDIA, KITCHEN_SAFETY_TIPS } from '../data/awarenessData';
import { UI_TRANSLATIONS } from '../translations/translations';

interface AwarenessSectionProps {
  currentLang: Language;
}

export const AwarenessSection: React.FC<AwarenessSectionProps> = ({ currentLang }) => {
  const t = UI_TRANSLATIONS[currentLang];
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'tips' | 'rights'>('encyclopedia');
  const [selectedAdulterantId, setSelectedAdulterantId] = useState<string>(ADULTERANT_ENCYCLOPEDIA[0].id);

  const selectedFact = ADULTERANT_ENCYCLOPEDIA.find(a => a.id === selectedAdulterantId) || ADULTERANT_ENCYCLOPEDIA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Awareness Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Consumer Awareness & Education</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.awarenessTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.awarenessSubtitle}
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => setActiveTab('encyclopedia')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'encyclopedia'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.adulterantGuideTab}
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'tips'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.safetyTipsTab}
          </button>

          <button
            onClick={() => setActiveTab('rights')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'rights'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.rightsTab}
          </button>
        </div>
      </div>

      {/* Tab 1: Adulterant Encyclopedia */}
      {activeTab === 'encyclopedia' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List of items on Left */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
              Common Adulterated Foods:
            </span>
            {ADULTERANT_ENCYCLOPEDIA.map((item) => {
              const isSelected = item.id === selectedAdulterantId;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedAdulterantId(item.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {item.foodName[currentLang]}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                        item.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      {item.adulterant[currentLang]}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-300'}`} />
                </div>
              );
            })}
          </div>

          {/* Detailed Item View on Right */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Food Safety Dossier
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {selectedFact.foodName[currentLang]}
              </h3>
              <p className="text-sm font-semibold text-red-600 mt-0.5">
                {selectedFact.adulterant[currentLang]}
              </p>
            </div>

            {/* Why Adulterated */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Why Merchants Add It:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {selectedFact.whyAdded[currentLang]}
              </p>
            </div>

            {/* Health Risks */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" />
                <span>Severe Health Impacts:</span>
              </h4>
              <ul className="space-y-2">
                {selectedFact.healthRisks[currentLang].map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 bg-red-50/50 p-2.5 rounded-xl border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Kitchen Check */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Recommended Rapid Kitchen Check:</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {selectedFact.quickCheck[currentLang]}
              </p>
            </div>

            {/* FSSAI Standard Reference */}
            <div className="text-xs text-slate-500 p-3 rounded-xl bg-slate-100 flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{selectedFact.fssaiStandard}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Kitchen Safety Tips */}
      {activeTab === 'tips' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KITCHEN_SAFETY_TIPS.map((tip) => (
            <div
              key={tip.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  {tip.title[currentLang]}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tip.description[currentLang]}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {tip.category}
                </span>
                <span className="text-xs text-slate-400">SafeBite Advisory</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: FSSAI & Legal Redressal */}
      {activeTab === 'rights' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Consumer Protection under Food Safety & Standards Act 2006
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Every Indian citizen has the statutory right to safe, unadulterated food.
              </p>
            </div>
          </div>

          {/* Legal Penalties Box */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-red-900 font-extrabold text-sm uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              <span>Statutory Penalties for Adulterators:</span>
            </div>
            <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
              {t.penaltiesText}
            </p>
          </div>

          {/* Steps to report an adulteration incident */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              How to Officially File an Adulteration Grievance:
            </h4>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <strong className="text-slate-900 block">Preserve Receipt and Packaging Sample:</strong>
                  <span className="text-slate-600">
                    Retain the original merchant bill, branded packet, batch number, or loose container sample stored airtight.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <strong className="text-slate-900 block">Lodge Grievance on FSSAI FoSCoS Portal:</strong>
                  <span className="text-slate-600">
                    Visit <a href="https://foscos.fssai.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">foscos.fssai.gov.in</a> and submit your complaint under the "Consumer Grievance" section with photos and location.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <strong className="text-slate-900 block">Dial National Consumer Helpline 1915:</strong>
                  <span className="text-slate-600">
                    Toll-free government helpline operational in 12+ Indian languages including Kannada and Hindi.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Helpline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3">
              <Phone className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase block">Consumer Helpline</span>
                <span className="text-lg font-black text-blue-950">1915 (Toll-Free)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase block">FSSAI Web Portal</span>
                <span className="text-sm font-bold text-emerald-950">foscos.fssai.gov.in</span>
              </div>
              <a
                href="https://foscos.fssai.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
