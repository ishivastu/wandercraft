'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, Compass, MapPin, DollarSign, Save, Calendar, CheckSquare, Wallet, Sparkles, ArrowRight } from 'lucide-react';
import ExpenseTracker from './components/ExpenseTracker';

const TripMap = dynamic(() => import('./components/TripMap'), { ssr: false });

export default function Home() {
  const [form, setForm] = useState({ destination: '', days: 3, budget: 'Moderate', interests: 'Food, History' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [trip, setTrip] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState('itinerary');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.trip) {
        data.trip.packingList = data.trip.packingList || [
          { category: 'Documents', items: ['Passport', 'Travel Insurance', 'ID Cards'] },
          { category: 'Clothing', items: ['Comfortable Walking Shoes', 'Weather-appropriate layers', 'Evening outfit'] },
          { category: 'Electronics', items: ['Universal Adapter', 'Power Bank', 'Smartphone & Charger'] }
        ];
        setTrip(data.trip);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/trips/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_shivastu_123', ...trip }),
      });
      const data = await res.json();
      if (data.success) alert('✨ Trip saved successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const currentDayActivities = trip?.itinerary?.[activeDay]?.activities || [];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#00FF00] selection:text-black">
      
      {/* Minimalist Top Navbar */}
      <header className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00FF00] flex items-center justify-center text-black font-bold shadow-[0_0_12px_rgba(0,255,0,0.5)]">
            W
          </div>
          <span className="font-extrabold text-xl tracking-tight">WanderCraft</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-zinc-600">
          <span className="hidden md:inline hover:text-zinc-900 cursor-pointer transition">Explore</span>
          <span className="hidden md:inline hover:text-zinc-900 cursor-pointer transition">Pricing</span>
          <button className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm">
            Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-[#00FF00]/40 text-xs font-semibold tracking-wide shadow-[0_0_8px_rgba(0,255,0,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF00]" /> AI-Powered Travel Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 leading-[1.1]">
            Plan your next journey with <span className="text-[#00B300] drop-shadow-[0_0_15px_rgba(0,255,0,0.3)]">absolute ease.</span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg">
            Create intelligent itineraries, track expenses live, and explore interactive maps designed for modern travelers.
          </p>
        </div>

        {/* Clean Minimalist Input Form */}
        <form onSubmit={handleGenerate} className="bg-zinc-50 border border-zinc-200/80 p-6 md:p-8 rounded-3xl shadow-xl shadow-zinc-100 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Destination</label>
            <input 
              type="text" required placeholder="e.g. Bali, Indonesia" 
              value={form.destination} onChange={(e) => setForm({...form, destination: e.target.value})} 
              className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-[#00FF00] transition shadow-xs" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Duration (Days)</label>
            <input 
              type="number" min="1" max="14" required 
              value={form.days} onChange={(e) => setForm({...form, days: parseInt(e.target.value)})} 
              className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-[#00FF00] transition shadow-xs" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Budget Style</label>
            <select 
              value={form.budget} onChange={(e) => setForm({...form, budget: e.target.value})} 
              className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-[#00FF00] transition shadow-xs"
            >
              <option>Budget</option>
              <option>Moderate</option>
              <option>Luxury</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              type="submit" disabled={loading} 
              className="w-full bg-[#00FF00] hover:bg-[#00E600] text-black font-bold py-3 rounded-xl shadow-md shadow-[#00FF00]/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : <><Compass className="w-4 h-4" /> Build Itinerary</>}
            </button>
          </div>
        </form>

        {/* Generated Trip Dashboard */}
        {trip && (
          <div className="space-y-8 animate-fade-in pt-4">
            
            {/* Overview Banner */}
            <div className="bg-zinc-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{trip.destination}</h2>
                  <span className="text-xs bg-[#00FF00]/15 text-[#00FF00] border border-[#00FF00]/30 px-3 py-1 rounded-full font-mono">
                    {form.days} Days • {form.budget}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm">{trip.summary}</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between">
                <div className="bg-zinc-800 border border-zinc-700 px-4 py-2.5 rounded-2xl text-[#00FF00] font-semibold flex items-center gap-2 text-sm font-mono shadow-[0_0_10px_rgba(0,255,0,0.1)]">
                  <DollarSign className="w-4 h-4 text-[#00FF00]" /> {trip.estimatedTotalCost}
                </div>
                <button 
                  onClick={handleSaveTrip} disabled={saving} 
                  className="bg-[#00FF00] hover:bg-[#00E600] text-black px-5 py-2.5 rounded-2xl text-sm font-bold transition flex items-center gap-2 disabled:opacity-50 shadow-[0_0_12px_rgba(0,255,0,0.3)]"
                >
                  <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Trip'}
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-zinc-200 pb-3 overflow-x-auto">
              {[
                { id: 'itinerary', label: 'Daily Itinerary', icon: Calendar },
                { id: 'map', label: 'Interactive Map', icon: MapPin },
                { id: 'expenses', label: 'Budget Tracker', icon: Wallet },
                { id: 'packing', label: 'Packing List', icon: CheckSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'bg-zinc-900 text-white shadow-sm' 
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#00FF00]' : ''}`} /> {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-2">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1">Select Day</h3>
                  <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2">
                    {trip.itinerary.map((dayObj, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveDay(idx)}
                        className={`w-full text-left px-4 py-3 rounded-2xl font-medium text-sm transition flex items-center justify-between ${
                          activeDay === idx 
                            ? 'bg-[#00FF00]/10 border border-[#00FF00] text-zinc-900 font-semibold shadow-[0_0_8px_rgba(0,255,0,0.15)]' 
                            : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        <span>Day {dayObj.day}</span>
                        <ArrowRight className={`w-4 h-4 ${activeDay === idx ? 'text-[#00B300]' : 'opacity-40'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3 bg-zinc-50 border border-zinc-200 p-6 md:p-8 rounded-3xl space-y-6">
                  <div className="border-b border-zinc-200 pb-4">
                    <span className="text-xs text-[#00B300] font-mono uppercase tracking-wider font-bold">Day {trip.itinerary[activeDay]?.day} Plan</span>
                    <h3 className="text-xl font-bold text-zinc-900 mt-1">{trip.itinerary[activeDay]?.theme}</h3>
                  </div>

                  <div className="space-y-6">
                    {trip.itinerary[activeDay]?.activities.map((act, i) => (
                      <div key={i} className="relative pl-6 border-l-2 border-[#00FF00] space-y-1.5">
                        <span className="text-xs text-black font-mono bg-[#00FF00] px-2.5 py-1 rounded-md font-bold shadow-[0_0_8px_rgba(0,255,0,0.4)]">
                          {act.time}
                        </span>
                        <h4 className="font-semibold text-zinc-900 text-base mt-2">{act.title}</h4>
                        <p className="text-sm text-zinc-600 leading-relaxed">{act.description}</p>
                        <p className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#00B300]" /> {act.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Map */}
            {activeTab === 'map' && (
              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-3xl space-y-3">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-sm font-semibold text-zinc-700">Route Map for Day {activeDay + 1}</h3>
                  <span className="text-xs text-zinc-400 font-mono">OpenStreetMap</span>
                </div>
                <div className="overflow-hidden rounded-2xl border border-zinc-200">
                  <TripMap activities={currentDayActivities} />
                </div>
              </div>
            )}

            {/* Tab 3: Expenses */}
            {activeTab === 'expenses' && (
              <ExpenseTracker trip={trip} setTrip={setTrip} />
            )}

            {/* Tab 4: Packing List */}
            {activeTab === 'packing' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trip.packingList?.map((categoryGroup, idx) => (
                  <div key={idx} className="bg-zinc-50 border border-zinc-200 p-6 rounded-3xl space-y-4">
                    <h3 className="font-bold text-zinc-900 text-base flex items-center gap-2 border-b border-zinc-200 pb-3">
                      <CheckSquare className="w-4 h-4 text-[#00B300]" /> {categoryGroup.category}
                    </h3>
                    <ul className="space-y-3">
                      {categoryGroup.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-3 text-sm text-zinc-700">
                          <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-[#00B300] focus:ring-[#00FF00]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}