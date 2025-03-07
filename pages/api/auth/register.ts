import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/dbConnect";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmails";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log("⏳ Connecting to database...");
    await connectDB();

    console.log("🔍 Checking if user exists...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("📧 Sending welcome email...");
    await sendEmail(email, "Welcome to Your App!", "welcome-email", { name });

    console.log("🔑 Generating JWT token...");
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });

    console.log("✅ User registered successfully.");
    res.status(201).json({
      message: "User registered successfully. A confirmation email has been sent.",
      token,
    });
  } catch (error) {
    console.error("❌ Error in /api/auth/register:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
