import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/models/Booking";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Extract email from query parameters
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email query parameter is required" }, { status: 400 });
    }

    // Get JWT token from headers
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    // Verify JWT token
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Server error: Missing JWT_SECRET" }, { status: 500 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { email: string };

    if (!decoded || decoded.email !== email) {
      return NextResponse.json({ error: "Forbidden: Invalid token" }, { status: 403 });
    }

    // Fetch bookings for the user
    const bookings = await Booking.find({ email });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
