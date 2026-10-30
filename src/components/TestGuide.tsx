import React, { useState } from 'react';
import { Clock, ShieldAlert, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { FoodItem, DARTTest, Language } from '../types';
import { UI_TRANSLATIONS } from '../translations/translations';

interface TestGuideProps {
  food: FoodItem;
  currentLang: Language;
  onProceedToCapture: (test: DARTTest) => void;
  onBack: () => void;
}

export const TestGuide: React.FC<TestGuideProps> = ({
  food,
  currentLang,
  onProceedToCapture,
  onBack
}) => {
  const t = UI_TRANSLATIONS[currentLang];
  const [selectedTestIndex, setSelectedTestIndex] = useState(0);

  const currentTest = food.dartTests[selectedTestIndex] || food.dartTests[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Back Button & Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToFoodsBtn}</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {food.category[currentLang]}
          </span>
          <span className="text-base font-extrabold text-slate-900">
            {food.name[currentLang]} ({food.name.en})
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100 p-6 sm:p-8 space-y-8">
        {/* Test Selector Tabs (if multiple tests available for this food) */}
        {food.dartTests.length > 1 && (
          <div className="border-b border-slate-100 pb-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select DART Test Protocol:
            </label>
            <div className="flex flex-wrap gap-2">
              {food.dartTests.map((test, index) => (
                <button
                  key={test.id}
                  onClick={() => setSelectedTestIndex(index)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedTestIndex === index
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {test.name[currentLang]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Test Title & Summary */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              FSSAI DART Method
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{t.estimatedTime} {currentTest.estimatedMinutes} {t.minutes}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {currentTest.name[currentLang]}
          </h2>

          <p className="text-sm text-slate-600 mt-1">
            Target Adulterant: <strong className="text-slate-800">{currentTest.targetAdulterant[currentLang]}</strong>
          </p>
        </div>

        {/* Safety Precautions Alert Box */}
        {currentTest.precautions[currentLang]?.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wider mb-1">
                {t.safetyPrecautions}
              </h4>
              <ul className="space-y-1 text-xs sm:text-sm text-amber-800">
                {currentTest.precautions[currentLang].map((precaution, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>{precaution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Equipment Needed Checklist */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{t.equipmentNeeded}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentTest.equipment[currentLang].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/60 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            {t.testStepsHeading}
          </h3>

          <div className="space-y-4">
            {currentTest.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="relative flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 transition-all shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {step.stepNumber}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">
                      {step.title[currentLang]}
                    </h4>
                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {step.visualHint}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.instruction[currentLang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What To Expect: Pure vs Adulterated Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Normal Outcome */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t.pureOutcomeLabel}</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
              {currentTest.pureOutcome[currentLang]}
            </p>
          </div>

          {/* Adulterated Outcome */}
          <div className="bg-red-50/70 border border-red-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{t.adulteratedOutcomeLabel}</span>
            </div>
            <p className="text-xs sm:text-sm text-red-900/90 leading-relaxed">
              {currentTest.adulteratedOutcome[currentLang]}
            </p>
          </div>
        </div>

        {/* Action Button: Proceed to Photo Capture */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Have you conducted the test? Proceed to scan your result photo.
          </p>

          <button
            onClick={() => onProceedToCapture(currentTest)}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.proceedToScanBtn}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
