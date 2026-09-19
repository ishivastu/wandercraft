import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, enum: ['Food', 'Transport', 'Stay', 'Activity', 'Other'], default: 'Other' },
  date: { type: Date, default: Date.now },
});

const TripSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  destination: { type: String, required: true },
  summary: { type: String },
  estimatedTotalCost: { type: String },
  itinerary: { type: Array, required: true },
  expenses: [ExpenseSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Trip || mongoose.model('Trip', TripSchema);