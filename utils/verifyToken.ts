import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  name?: string;
}

export function verifyToken(token: string): CustomJwtPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!) as CustomJwtPayload;
  } catch (err) {
    return null;
  }
}
