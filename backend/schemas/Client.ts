import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

export const baseSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  verificationToken: z.string().optional(),
  verificationExpires: z.date().optional(),
});

export type Client = z.infer<typeof baseSchema>;
export type ClientDocument = Client & { _id: ObjectId };
