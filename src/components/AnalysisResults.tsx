import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  Printer,
  MapPin,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Phone,
  Copy,
  Info
} from 'lucide-react';
import { FoodItem, DARTTest, AnalysisResult, Language } from '../types';
import { UI_TRANSLATIONS } from '../translations/translations';

interface AnalysisResultsProps {
  food: FoodItem;
  test: DARTTest;
  result: AnalysisResult;
  currentLang: Language;
  onReset: () => void;
  onReportToMap: (reportPrefill: { foodName: string; testName: string; status: 'normal' | 'suspicious' | 'inconclusive'; suspectedAdulterant: string; notes: string }) => void;
  testedImage: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  food,
  test,
  result,
  currentLang,
  onReset,
  onReportToMap,
  testedImage
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  useEffect(() => {
    if (result.status === 'normal') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore confetti errors
      }
    }
  }, [result.status]);

  const getStatusBadge = () => {
    switch (result.status) {
      case 'normal':
        return {
          title: t.statusPure,
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
          pill: 'bg-emerald-600 text-white',
          themeBorder: 'border-emerald-300'
        };
      case 'suspicious':
        return {
          title: t.statusSuspicious,
          bg: 'bg-red-50 border-red-200 text-red-800',
          icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
          pill: 'bg-red-600 text-white',
          themeBorder: 'border-red-300'
        };
      default:
        return {
          title: t.statusInconclusive,
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: <HelpCircle className="w-6 h-6 text-amber-600" />,
          pill: 'bg-amber-600 text-white',
          themeBorder: 'border-amber-300'
        };
    }
  };

  const statusConfig = getStatusBadge();

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `SafeBite Scanner Report:
Food: ${food.name[currentLang]} (${food.name.en})
Test: ${test.name[currentLang]}
Status: ${result.status.toUpperCase()}
Risk Level: ${result.riskLevel.toUpperCase()}
Adulterant Suspected: ${result.adulterantSuspected}
Findings: ${result.detectedCharacteristics.join('; ')}
Notice: Indicative visual screening demo. Not a certified laboratory test.`;

    navigator.clipboard.writeText(text);
    alert(t.copiedAlert);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-blue-900 leading-relaxed">
          <strong>{t.resultDemoNotice}</strong>
          <span className="block mt-0.5 text-blue-800">
            Official legal confirmation requires certified testing in an FSSAI-notified or NABL-accredited laboratory under the Food Safety and Standards Act 2006.
          </span>
        </div>
      </div>

      {/* Main Report Card */}
      <div className={`bg-white rounded-3xl border-2 ${statusConfig.themeBorder} shadow-xl shadow-slate-200/80 p-6 sm:p-8 space-y-8`}>
        {/* Header: Status & Risk Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${statusConfig.bg} border flex items-center justify-center shrink-0`}>
              {statusConfig.icon}
            </div>
            <div>
              <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusConfig.pill}`}>
                {result.status}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {statusConfig.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Risk Indicator Badge */}
            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Risk Indicator
              </span>
              <span className={`inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold px-3 py-1 rounded-lg ${
                result.riskLevel === 'high'
                  ? 'bg-red-100 text-red-800 border border-red-200'
                  : result.riskLevel === 'moderate'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {result.riskLevel === 'high' ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>{t.riskHigh}</span>
                  </>
                ) : result.riskLevel === 'moderate' ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{t.riskModerate}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.riskLow}</span>
                  </>
                )}
              </span>
            </div>

            {/* Confidence Score Pill */}
            <div className="text-right pl-3 border-l border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.confidenceScore}
              </span>
              <span className="text-base sm:text-lg font-black text-slate-800">
                {result.confidenceScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Snapshot & Metadata Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Tested Image Thumbnail */}
          <div className="md:col-span-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xs aspect-4/3 flex items-center justify-center">
              <img
                src={testedImage}
                alt="Analyzed food sample"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/70 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                Analyzed Sample
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="md:col-span-8 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">
                  {t.foodTested}
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {food.name[currentLang]} ({food.name.en})
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">
                  {t.protocolUsed}
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block truncate">
                  {test.name[currentLang]}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs sm:text-sm">
              <span className="text-[11px] font-bold text-slate-400 uppercase block">
                {t.suspectedItem}
              </span>
              <span className="font-bold text-slate-900 mt-0.5 block">
                {result.adulterantSuspected}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Source: <strong className="text-slate-700">{result.source}</strong></span>
              <span className="text-[11px] text-slate-400">FSSAI DART Method</span>
            </div>
          </div>
        </div>

        {/* Detected Visual Characteristics */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{t.visualObservations}</span>
          </h3>

          <div className="space-y-2">
            {result.detectedCharacteristics.map((char, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800"
              >
                {result.status === 'suspicious' ? (
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                )}
                <span>{char}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Assessment Explanation */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            {t.explanationHeading}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60">
            {result.visualExplanation}
          </p>
        </div>

        {/* Consumer Recommendations */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-900">
            {t.recommendationsHeading}
          </h3>
          <div className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm text-emerald-900"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FSSAI Standard Reference & Legal Contacts */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">{t.fssaiReferenceHeading}</span>
            <span className="text-slate-500">{result.fssaiStandardReference}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 pt-1 border-t border-slate-200/60">
            <span className="flex items-center gap-1 font-semibold text-slate-900">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              National Consumer Helpline: 1915
            </span>
            <span className="flex items-center gap-1 text-blue-600 hover:underline">
              <ExternalLink className="w-3.5 h-3.5" />
              <a href="https://foscos.fssai.gov.in" target="_blank" rel="noopener noreferrer">
                FoSCoS Consumer Portal
              </a>
            </span>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printReportBtn}</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Share Summary</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => onReportToMap({
                foodName: food.name.en,
                testName: test.name.en,
                status: result.status,
                suspectedAdulterant: result.adulterantSuspected,
                notes: result.visualExplanation
              })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>{t.reportToMapBtn}</span>
            </button>

            <button
              onClick={onReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.testAnotherBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
