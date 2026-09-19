import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Trip from '@/models/Trip';

export async function POST(req) {
  try {
    await connectDB();
    const { userId, destination, summary, estimatedTotalCost, itinerary } = await req.json();

    const newTrip = await Trip.create({ userId, destination, summary, estimatedTotalCost, itinerary });
    return NextResponse.json({ success: true, tripId: newTrip._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save trip.' }, { status: 500 });
  }
}