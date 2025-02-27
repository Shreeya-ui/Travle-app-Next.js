// pages/api/protected.ts
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../utils/verifyToken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  res.status(200).json({ message: "Protected data", user: decoded });
}
