import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/dbConnect";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmails";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Ensure JWT secret key exists
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      console.error("JWT Secret key is missing in environment variables");
      return res.status(500).json({ message: "Internal server error" });
    }

    // Generate JWT token using email as payload
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: "1h" });

    // Set token in HTTP-only cookie (optional for added security)
    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`);

    // Send login notification email
    await sendEmail(email, "Login Notification", "login-notification", { name: user.name });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in" });
  }
}
