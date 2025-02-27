import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/models/Booking";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  try {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Decode token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Get booking details
    const { location, startDate, endDate, travelers } = req.body;
    const userId = decoded.id;

    // Create a new booking
    const newBooking = new Booking({ userId, location, startDate, endDate, travelers });
    await newBooking.save();

    // Add booking to user’s profile
    await User.findByIdAndUpdate(userId, { $push: { bookings: newBooking._id } });

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Error storing booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
