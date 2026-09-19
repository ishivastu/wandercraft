import { NextResponse } from 'next/server';
import { ai } from '@/lib/gemini';
import redis from '@/lib/redis';

export async function POST(req) {
  try {
    const { destination, days, budget, interests } = await req.json();

    if (!destination || !days) {
      return NextResponse.json({ error: 'Destination and days are required.' }, { status: 400 });
    }

    const cacheKey = `trip:${destination.toLowerCase()}:${days}:${budget}:${interests}`;
    
    // With Upstash REST client, cachedData is often already parsed as a JSON object automatically
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return NextResponse.json({ source: 'cache', trip: cachedData });
    }

    const prompt = `
      Create a detailed ${days}-day travel itinerary for ${destination}. 
      Budget level: ${budget}. Traveler interests: ${interests}.
      
      You MUST return a valid JSON object matching this exact structural schema:
      {
        "destination": "${destination}",
        "summary": "Brief inspiring overview",
        "estimatedTotalCost": "Estimated budget string e.g. $1200",
        "itinerary": [
          {
            "day": 1,
            "theme": "Theme title",
            "activities": [
              {
                "time": "09:00 AM",
                "title": "Activity name",
                "description": "Description",
                "location": "Place name",
                "coordinates": [latitude_number, longitude_number]
              }
            ]
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    // Parse response text safely
    const tripData = JSON.parse(response.text);

    // Correct Upstash syntax: redis.set(key, value, { ex: expiration_in_seconds })
    await redis.set(cacheKey, tripData, { ex: 86400 });

    return NextResponse.json({ source: 'ai', trip: tripData });
  } catch (error) {
    console.error('Trip generation error:', error);
    return NextResponse.json({ error: 'Failed to generate trip itinerary.' }, { status: 500 });
  }
}