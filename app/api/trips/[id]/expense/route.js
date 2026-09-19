import { NextResponse } from 'next/server';
import connectDB from "../../../../../lib/mongodb";
import Trip from '../../../../../models/Trip';

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { title, amount, category } = await req.json();

    const trip = await Trip.findById(id);
    if (!trip) return NextResponse.json({ error: 'Trip not found.' }, { status: 404 });

    trip.expenses.push({ title, amount: parseFloat(amount), category });
    await trip.save();

    return NextResponse.json({ success: true, trip });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add expense.' }, { status: 500 });
  }
}