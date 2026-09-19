'use client';
import { useState } from 'react';
import { PlusCircle, Wallet } from 'lucide-react';

export default function ExpenseTracker({ trip, setTrip }) {
  const [form, setForm] = useState({ title: '', amount: '', category: 'Food' });
  const [loading, setLoading] = useState(false);

  const totalSpent = trip.expenses?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  const estimatedNumeric = parseInt(trip.estimatedTotalCost?.replace(/[^0-9]/g, '') || '1000');
  const spendingPercentage = Math.min(Math.round((totalSpent / estimatedNumeric) * 100), 100);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !trip._id) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/trips/${trip._id}/expense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setTrip(data.trip);
        setForm({ title: '', amount: '', category: 'Food' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Wallet className="w-5 h-5 text-indigo-400" /> Budget & Expense Tracker
        </h3>
        <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800 px-3 py-1 rounded-full font-mono">
          AI Estimate: {trip.estimatedTotalCost}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Spent: ${totalSpent}</span>
          <span>{spendingPercentage}% of budget</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
          <div className={`h-full transition-all duration-500 ${spendingPercentage > 90 ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${spendingPercentage}%` }} />
        </div>
      </div>

      <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input type="text" placeholder="Title (e.g. Dinner)" required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
        <input type="number" placeholder="Amount ($)" required value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
        <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
          <option>Food</option>
          <option>Transport</option>
          <option>Stay</option>
          <option>Activity</option>
          <option>Other</option>
        </select>
        <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm py-2 rounded-xl transition flex items-center justify-center gap-1 disabled:opacity-50">
          <PlusCircle className="w-4 h-4" /> Add
        </button>
      </form>
    </div>
  );
}