// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express";
import { Request, Response } from "npm:express";
import type { ClientDocument } from "../Database.ts";
import { generateToken} from "../jwtMiddleware.ts"
import { baseSchema } from "../schemas/Client.ts";
import bcryptjs from "npm:bcryptjs";
import { Database } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { crypto } from "https://deno.land/std@0.224.0/crypto/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { sendWelcomeEmail } from "../utils/Emailer.ts";

config({ export: true });

export const router = (db: Database) => {
  const router = express.Router();
  const clientsCollection = db.collection<ClientDocument>("clients");
  // Create new client route
  router.post("/", async (req: Request, res: Response) => {
    try {
      const { fullName, email, password } = req.body;

      // Validate input with required password check
      const parsedData = baseSchema
        .required({ password: true }) //since not google auth
        .parse({
          fullName,
          email,
          password,
          verificationToken: crypto.randomUUID(),
          verificationExpires: new Date(Date.now() + 60 * 60 * 1000),
        });
      // Check for existing user
      const existingClient = await clientsCollection.findOne({ email });
      if (existingClient) {
        return res.status(409).json({ error: "Email already exists" });
      }

      // Hash password for safer storage
      const hashedPassword = await bcryptjs.hash(parsedData.password, 10);

      // Create insert document with explicit password
      const insertDoc = {
        ...parsedData,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Insert new client
      const insertId = await clientsCollection.insertOne(insertDoc);

      // Get the created client using correct insertResult property
      const newClient = await clientsCollection.findOne({
        _id: insertId,
      });

      // Send verification email
      try {
        await sendWelcomeEmail({
          email: newClient!.email,
          fullName: newClient!.fullName,
          verificationToken: newClient!.verificationToken!,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      // Sanitize response
      const {
        password: _,
        verificationToken: _verificationToken,
        verificationExpires: _verificationExpires,
        ...clientData
      } = newClient!;

      return res.status(201).json({
        message: "Client created successfully",
        client: clientData,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Login route
  router.post("/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const client = await clientsCollection.findOne({ email });
      if (!client) {
        return res.status(404).json({ error: "User not found" });
      }

      const passwordValid = client.password
        ? await bcryptjs.compare(password, client.password)
        : false;
      if (!passwordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = await generateToken({
        _id: client._id!.toString(),
        email: client.email,
        fullName: client.fullName,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: Deno.env.get("DENO_ENV") === "production",
        sameSite: "strict",
        maxAge: 5 * 60 * 60 * 1000,
        path: "/",
      });

      const { password: _, ...userData } = client;
      res.status(200).json({
        message: "Login successful",
        user: userData,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
}
