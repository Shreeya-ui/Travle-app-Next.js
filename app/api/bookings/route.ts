import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "../../../models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userId, location, startDate, endDate, travelers } = await req.json();

    if (!userId || !location || !startDate || !endDate || !travelers) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add new booking to user's bookings array
    user.bookings.push({ location, startDate, endDate, travelers });
    await user.save();

    return NextResponse.json({ message: "Booking saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving booking:", error);
    return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
  }
}
