import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/utils/dbConnect";
import Booking from "@/models/Booking";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "POST") {
    // Handle Booking (As implemented above)
  }

  if (req.method === "GET") {
    try {
      // ✅ Extract token and decode email
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      // ✅ Properly type `decoded`
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
      const userEmail = decoded?.email;
      if (!userEmail) return res.status(401).json({ message: "Invalid token" });

      // ✅ Fetch bookings by user email
      const bookings = await Booking.find({ userEmail });
      res.status(200).json({ bookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
