import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { throwError } from "./throwError";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = (plainPassword: string, passwordHash: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, passwordHash);
}

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET);
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throwError("Invalid token.", 403)
  }
}