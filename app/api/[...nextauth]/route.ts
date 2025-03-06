import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect().catch((err) => {
      console.error("Database Connection Error:", err);
      return NextResponse.json({ error: "Database Connection Failed" }, { status: 500 });
    });

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "No user found!" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Ensure JWT secret exists
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is missing in environment variables");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "7d" });

    return NextResponse.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error: unknown) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
