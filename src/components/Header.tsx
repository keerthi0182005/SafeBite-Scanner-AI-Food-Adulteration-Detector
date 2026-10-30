import React from 'react';
import { ShieldCheck, MapPin, BookOpen, AlertCircle, Sparkles, Globe } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../translations/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: 'scanner' | 'map' | 'awareness' | 'rights';
  onTabChange: (tab: 'scanner' | 'map' | 'awareness' | 'rights') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  const languages: { code: Language; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'EN' },
    { code: 'kn', label: 'ಕನ್ನಡ', sub: 'KN' },
    { code: 'hi', label: 'हिन्दी', sub: 'HI' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{t.badgeFssai}</span>
          <span className="hidden sm:inline text-blue-200">|</span>
          <span className="hidden sm:inline text-blue-100">National Consumer Safety Initiative</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-blue-100">
          <span>Helpline: <strong className="text-white">1915</strong></span>
          <span className="text-blue-300">•</span>
          <span className="hidden md:inline">foscos.fssai.gov.in</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => onTabChange('scanner')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Safe<span className="text-blue-600">Bite</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 rounded-full border border-emerald-200">
                  AI SCANNER
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => onTabChange('scanner')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'scanner'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              {t.navScanner}
            </button>
            <button
              onClick={() => onTabChange('map')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'map'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              {t.navMap}
            </button>
            <button
              onClick={() => onTabChange('awareness')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'awareness'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              {t.navAwareness}
            </button>
            <button
              onClick={() => onTabChange('rights')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'rights'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-indigo-600" />
              {t.navRights}
            </button>
          </nav>

          {/* Multilingual Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <div className="pl-1.5 pr-1 text-slate-400">
                <Globe className="w-3.5 h-3.5" />
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    currentLang === lang.code
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                  title={lang.label}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 gap-1 overflow-x-auto">
          <button
            onClick={() => onTabChange('scanner')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
              activeTab === 'scanner' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.navScanner}
          </button>
          <button
            onClick={() => onTabChange('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
              activeTab === 'map' ? 'bg-emerald-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {t.navMap}
          </button>
          <button
            onClick={() => onTabChange('awareness')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
              activeTab === 'awareness' ? 'bg-amber-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t.navAwareness}
          </button>
          <button
            onClick={() => onTabChange('rights')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
              activeTab === 'rights' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {t.navRights}
          </button>
        </div>
      </div>
    </header>
  );
};
