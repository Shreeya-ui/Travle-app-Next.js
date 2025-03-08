import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/dbConnect";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmails";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }else{
    res.status(200).json({ message: "Login successful" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    console.log("⏳ Connecting to database...");
    await connectDB();

    console.log("🔍 Finding user...");
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("🔑 Verifying password...");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("🔑 Generating JWT token...");
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, secretKey, { expiresIn: "1h" });

    console.log("📧 Sending login notification email...");
    await sendEmail(email, "Login Notification", "login-notification", { name: user.name });

    console.log("✅ Login successful.");
    res.status(200).json({ message: "Login successful", token, email: user.email });
  } catch (error: unknown) {
    console.error("❌ Login Error:", error);

    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
}
