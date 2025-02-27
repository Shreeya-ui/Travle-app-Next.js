import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/dbConnect";
import User from "../../../models/User";
import { sendEmail } from "../../../utils/sendEmails";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Send Welcome Email
    await sendEmail(email, "Welcome to Your App!", "welcome-email", { name });

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully. A confirmation email has been sent to your official email.",
      token,
    });
  } catch (error) {
    console.error("Error in /api/auth/register:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
