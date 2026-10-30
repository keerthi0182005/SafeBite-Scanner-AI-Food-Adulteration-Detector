import React, { useState, useEffect } from 'react';
import { MapPin, ShieldAlert, CheckCircle2, Filter, Plus, Search, Building2, Calendar, AlertTriangle, X } from 'lucide-react';
import { SafetyReport, Language } from '../types';
import { UI_TRANSLATIONS } from '../translations/translations';

interface FoodSafetyMapProps {
  currentLang: Language;
  prefillReport?: {
    foodName: string;
    testName: string;
    status: 'normal' | 'suspicious' | 'inconclusive';
    suspectedAdulterant: string;
    notes: string;
  } | null;
  onClearPrefill?: () => void;
}

export const FoodSafetyMap: React.FC<FoodSafetyMapProps> = ({
  currentLang,
  prefillReport,
  onClearPrefill
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  const [reports, setReports] = useState<SafetyReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);

  // Filters
  const [filterFood, setFilterFood] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Report Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    foodName: '',
    state: 'Karnataka',
    city: 'Bengaluru',
    locality: '',
    testName: 'General DART Rapid Test',
    status: 'suspicious' as 'normal' | 'suspicious' | 'inconclusive',
    riskLevel: 'moderate' as 'low' | 'moderate' | 'high',
    suspectedAdulterant: '',
    vendorType: 'Local Grocer' as 'Local Grocer' | 'Supermarket' | 'Loose Milk Vendor' | 'Street Vendor' | 'Branded Packet',
    userNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reports from backend
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/reports');
      const data = await res.json();
      if (data.reports) {
        setReports(data.reports);
      }
    } catch (err) {
      console.warn('Failed to fetch community reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle prefill if opened from Results page
  useEffect(() => {
    if (prefillReport) {
      setFormData((prev) => ({
        ...prev,
        foodName: prefillReport.foodName,
        testName: prefillReport.testName,
        status: prefillReport.status,
        suspectedAdulterant: prefillReport.suspectedAdulterant,
        userNotes: prefillReport.notes
      }));
      setIsModalOpen(true);
      if (onClearPrefill) onClearPrefill();
    }
  }, [prefillReport, onClearPrefill]);

  // Submit new report
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.foodName || !formData.city || !formData.locality) {
      alert('Please fill in food item, city, and locality.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success && data.report) {
        setReports((prev) => [data.report, ...prev]);
        setSelectedReport(data.report);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error('Error submitting report:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered reports
  const filteredReports = reports.filter((rep) => {
    const matchesFood = filterFood === 'all' || rep.foodId.toLowerCase().includes(filterFood.toLowerCase()) || rep.foodName.toLowerCase().includes(filterFood.toLowerCase());
    const matchesStatus = filterStatus === 'all' || rep.status === filterStatus;
    const matchesSearch = !searchQuery || 
      rep.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.state.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFood && matchesStatus && matchesSearch;
  });

  const suspiciousCount = reports.filter(r => r.status === 'suspicious').length;
  const verifiedCount = reports.filter(r => r.verifiedByLocalLab).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header and Call to Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>Pan-India Consumer Watch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.mapTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {t.mapSubtitle}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>{t.submitReportBtn}</span>
        </button>
      </div>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg">
            {reports.length}
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">{t.totalReports}</div>
            <div className="text-lg font-bold text-slate-900">Active Watch Sites</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-black text-lg">
            {suspiciousCount}
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">{t.suspiciousAlerts}</div>
            <div className="text-lg font-bold text-slate-900">Requires Lab Follow-up</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
            {verifiedCount}
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">{t.verifiedReports}</div>
            <div className="text-lg font-bold text-slate-900">NABL / FSSAI Notified</div>
          </div>
        </div>
      </div>

      {/* Interactive Map Visualizer & Live Report Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Regional Map (SVG visualizer with city nodes) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white relative flex flex-col justify-between overflow-hidden min-h-[460px]">
          {/* Map Title / Legend */}
          <div className="flex items-center justify-between z-10">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Regional Incident Cluster
              </span>
              <h3 className="text-lg font-bold text-white">India Geo-Adulteration Map</h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
                <span className="text-red-400 font-semibold">Suspicious</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-emerald-300 font-semibold">Tested Pure</span>
              </span>
            </div>
          </div>

          {/* Stylized SVG Map of India with Interactive Report Pins */}
          <div className="relative my-4 flex items-center justify-center">
            <svg
              viewBox="0 0 500 550"
              className="w-full max-w-[420px] h-auto drop-shadow-xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Abstract Stylized Geographic Outline of India */}
              <path
                d="M 230 40 
                   Q 260 60 270 90 
                   L 290 120 
                   Q 330 130 350 160 
                   L 410 170 
                   L 440 200 
                   L 400 220 
                   L 340 230 
                   Q 330 270 310 320 
                   L 290 380 
                   L 260 440 
                   L 230 490 
                   L 200 440 
                   L 170 370 
                   L 150 310 
                   L 130 250 
                   L 120 220 
                   L 160 190 
                   L 170 140 
                   L 200 100 
                   Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />

              {/* State grid guides */}
              <line x1="160" y1="200" x2="360" y2="200" stroke="#334155" strokeDasharray="3 3" />
              <line x1="150" y1="320" x2="310" y2="320" stroke="#334155" strokeDasharray="3 3" />
              <line x1="200" y1="420" x2="270" y2="420" stroke="#334155" strokeDasharray="3 3" />

              {/* Regional City Pins */}
              {reports.map((rep) => {
                // Approximate coordinate projection on 500x550 SVG
                // Lat ~ 8 to 32 -> Y ~ 490 to 80
                // Lng ~ 70 to 88 -> X ~ 130 to 410
                const lat = rep.coordinates[0];
                const lng = rep.coordinates[1];
                const y = 490 - ((lat - 8) / 26) * 410;
                const x = 130 + ((lng - 70) / 20) * 260;

                const isSelected = selectedReport?.id === rep.id;
                const isSuspicious = rep.status === 'suspicious';

                return (
                  <g
                    key={rep.id}
                    onClick={() => setSelectedReport(rep)}
                    className="cursor-pointer group"
                    transform={`translate(${x}, ${y})`}
                  >
                    {isSuspicious && (
                      <circle
                        r={isSelected ? "14" : "10"}
                        fill="#ef4444"
                        fillOpacity="0.3"
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      r={isSelected ? "8" : "6"}
                      fill={isSuspicious ? "#ef4444" : "#10b981"}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      y="-10"
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="9"
                      fontWeight="bold"
                      className="pointer-events-none select-none opacity-90"
                    >
                      {rep.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Pin Mini Banner Overlay */}
          {selectedReport && (
            <div className="z-10 bg-slate-800/95 backdrop-blur-md border border-slate-700 p-3.5 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3">
                <div className={`w-3.5 h-3.5 rounded-full ${selectedReport.status === 'suspicious' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{selectedReport.foodName} in {selectedReport.locality}, {selectedReport.city}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                      selectedReport.status === 'suspicious' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Suspected: {selectedReport.suspectedAdulterant} ({selectedReport.reportedDate})
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Helper caption */}
          <div className="text-[11px] text-slate-400 text-center z-10 pt-2">
            Click any pin on the map to inspect neighborhood adulteration reports.
          </div>
        </div>

        {/* Right: Search, Filters & Report List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, locality, food (e.g. Bengaluru, Milk)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <div className="flex items-center gap-1 text-slate-500 font-semibold shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>

            <select
              value={filterFood}
              onChange={(e) => setFilterFood(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700"
            >
              <option value="all">All Foods</option>
              <option value="milk">Milk</option>
              <option value="turmeric">Turmeric</option>
              <option value="chilli">Chilli</option>
              <option value="oil">Cooking Oil</option>
              <option value="rice">Rice</option>
              <option value="sugar">Sugar</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="suspicious">Suspicious Alerts</option>
              <option value="normal">Tested Normal</option>
            </select>
          </div>

          {/* Scrollable Report Feed */}
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Loading community reports...
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                No reports found matching your search. Be the first to report from your area!
              </div>
            ) : (
              filteredReports.map((rep) => {
                const isSelected = selectedReport?.id === rep.id;

                return (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedReport(rep)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${rep.status === 'suspicious' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {rep.foodName}
                        </h4>
                      </div>

                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        rep.status === 'suspicious'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {rep.status === 'suspicious' ? 'Suspicious' : 'Normal'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{rep.locality}, {rep.city}</span>
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{rep.reportedDate}</span>
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div>
                        <strong>Suspected:</strong> {rep.suspectedAdulterant}
                      </div>
                      <p className="text-slate-600 mt-0.5 line-clamp-2">
                        {rep.userNotes}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span>{rep.vendorType}</span>
                      </span>

                      {rep.verifiedByLocalLab ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Lab-Notified
                        </span>
                      ) : (
                        <span>Consumer Screening</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Community Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {t.reportFormTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  Help local families stay informed about adulterated food supplies
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t.foodNameInput}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Turmeric Powder / Loose Buffalo Milk"
                  value={formData.foodName}
                  onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">State:</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.cityInput}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru, Mysuru"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.localityInput}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Malleshwaram 8th Cross / Jayanagar 4th Block"
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Test Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'normal' | 'suspicious' | 'inconclusive' })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="suspicious">Suspicious / Adulterated</option>
                    <option value="normal">Normal / Tested Pure</option>
                    <option value="inconclusive">Inconclusive</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vendor Type:</label>
                  <select
                    value={formData.vendorType}
                    onChange={(e) => setFormData({ ...formData, vendorType: e.target.value as 'Local Grocer' | 'Supermarket' | 'Loose Milk Vendor' | 'Street Vendor' | 'Branded Packet' })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="Loose Milk Vendor">Loose Milk Vendor</option>
                    <option value="Local Grocer">Local Grocer</option>
                    <option value="Street Vendor">Street Vendor</option>
                    <option value="Supermarket">Supermarket</option>
                    <option value="Branded Packet">Branded Packet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Suspected Adulterant:</label>
                <input
                  type="text"
                  placeholder="e.g. Metanil Yellow, Synthetic Detergent, Brick Dust"
                  value={formData.suspectedAdulterant}
                  onChange={(e) => setFormData({ ...formData, suspectedAdulterant: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.findingsInput}</label>
                <textarea
                  rows={3}
                  placeholder="Describe your test observations (e.g. foam stayed > 10 mins, persistent magenta pink color, gritty scratch on glass)..."
                  value={formData.userNotes}
                  onChange={(e) => setFormData({ ...formData, userNotes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
                >
                  {isSubmitting ? 'Submitting...' : t.submitReportConfirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
