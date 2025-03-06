import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/utils/dbConnect";
import Booking from "@/models/Booking";

// ✅ Ensure this is an async function
export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;

    if (!decoded?.email) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { location, startDate, endDate, travelers } = await req.json();

    if (!location || !startDate || !endDate || !travelers) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newBooking = new Booking({
      userEmail: decoded.email,
      location,
      startDate,
      endDate,
      travelers,
    });

    await newBooking.save();

    return NextResponse.json({ message: "Booking successful", booking: newBooking }, { status: 201 });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
