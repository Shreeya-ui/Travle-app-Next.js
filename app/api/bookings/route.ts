import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/dbConnect";
import Booking from "@/models/Booking";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    if (!decoded?.email) return res.status(401).json({ message: "Invalid token" });

    const { location, startDate, endDate, travelers } = req.body;

    const newBooking = new Booking({
      userEmail: decoded.email, // ✅ Store user email in booking
      location,
      startDate,
      endDate,
      travelers,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
