import React from 'react';
import { Milk, Sparkles, Flame, Droplet, Wheat, Cookie, ArrowRight, FlaskConical } from 'lucide-react';
import { FoodItem, FoodId, Language } from '../types';
import { FOOD_DATABASE } from '../data/foodsData';
import { UI_TRANSLATIONS } from '../translations/translations';

interface FoodSelectorProps {
  currentLang: Language;
  selectedFoodId: FoodId | null;
  onSelectFood: (food: FoodItem) => void;
}

export const FoodSelector: React.FC<FoodSelectorProps> = ({
  currentLang,
  selectedFoodId,
  onSelectFood
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  const getFoodIcon = (id: FoodId) => {
    switch (id) {
      case 'milk':
        return <Milk className="w-7 h-7 text-blue-600" />;
      case 'turmeric':
        return <Sparkles className="w-7 h-7 text-amber-600" />;
      case 'chilli':
        return <Flame className="w-7 h-7 text-red-600" />;
      case 'oil':
        return <Droplet className="w-7 h-7 text-emerald-600" />;
      case 'rice':
        return <Wheat className="w-7 h-7 text-teal-600" />;
      case 'sugar':
        return <Cookie className="w-7 h-7 text-indigo-600" />;
      default:
        return <FlaskConical className="w-7 h-7 text-slate-600" />;
    }
  };

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
          <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
          <span>FSSAI DART Protocols</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.selectFoodHeading}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          {t.selectFoodSubheading}
        </p>
      </div>

      {/* Grid of 6 Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {FOOD_DATABASE.map((food) => {
          const isSelected = selectedFoodId === food.id;

          return (
            <div
              key={food.id}
              onClick={() => onSelectFood(food)}
              className={`group relative bg-white rounded-2xl p-6 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-lg shadow-blue-600/10 -translate-y-1'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div>
                {/* Top Row: Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${food.colorScheme.light} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    {getFoodIcon(food.id)}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${food.colorScheme.badge}`}>
                    {food.category[currentLang]}
                  </span>
                </div>

                {/* Food Name & Tagline */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {food.name[currentLang]}
                    </h3>
                    {currentLang !== 'en' && (
                      <span className="text-xs font-medium text-slate-400">
                        ({food.name.en})
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {food.tagline[currentLang]}
                  </p>
                </div>

                {/* Common Adulterants Pills */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {t.commonAdulterantsLabel}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {food.commonAdulterants[currentLang].slice(0, 3).map((adulterant, index) => (
                      <span
                        key={index}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                      >
                        {adulterant}
                      </span>
                    ))}
                    {food.commonAdulterants[currentLang].length > 3 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                        +{food.commonAdulterants[currentLang].length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {food.dartTests.length} {t.availableTestsCount}
                </span>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all">
                  <span>{t.selectBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
