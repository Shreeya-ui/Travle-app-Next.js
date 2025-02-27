// /pages/api/groq-hotels.ts
import Groq from "groq-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { location, numPeople, numDays } = req.body;

  try {
    // Fetch hotel details (simulate this using Groq)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `List the best hotels in ${location} with pricing details.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const hotelDetails = chatCompletion.choices[0]?.message?.content || "No hotels available.";
    // Mock hotel pricing info (replace this with dynamic content if possible)
    const hotels = [
      { name: "Hotel Grand", pricePerNight: 100 },
      { name: "City View Inn", pricePerNight: 80 },
      { name: "Beachside Resort", pricePerNight: 150 },
    ];

    // Calculate total price for each hotel
    const hotelsWithPrice = hotels.map((hotel) => ({
      ...hotel,
      totalPrice: hotel.pricePerNight * numPeople * numDays,
    }));

    res.status(200).json({ hotels: hotelsWithPrice });
  } catch (error) {
    console.error("Error fetching Groq completion:", error);
    res.status(500).json({ error: "Failed to fetch hotel details." });
  }
}
