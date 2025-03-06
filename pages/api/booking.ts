// pages/api/bookings.ts
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Booking from "@/models/Booking";
import connectDB from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, location, startDate, endDate, travelers } = req.body;

  if (!userId || !location || !startDate || !endDate || !travelers) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await connectDB();

    const newBooking = new Booking({
      userId: new mongoose.Types.ObjectId(userId),
      location,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      travelers,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({ message: "Booking saved successfully", booking: savedBooking });
  } catch (error: unknown) {
    console.error("Error saving booking:", error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default handler;
