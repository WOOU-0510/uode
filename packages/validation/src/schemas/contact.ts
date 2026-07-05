import { z } from "zod";

export const email = z.string().trim().email();

export const phoneNumber = z
  .string()
  .trim()
  .regex(/^\+?[1-9]\d{7,14}$/);

export type Email = z.infer<typeof email>;
export type PhoneNumber = z.infer<typeof phoneNumber>;
