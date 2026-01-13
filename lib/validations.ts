import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(10000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(100),
  rating: z.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .min(4)
    .regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, "Invalid hex color"),

  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});
