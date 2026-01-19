// database/seed.ts
import ImageKit from "imagekit";
import dummybooks from "../dummybooks.json"; // make sure your json export is default
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config as loadEnv } from "dotenv";
import { books } from "./schema";

loadEnv({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

async function uploadToImageKit(url: string, fileName: string, folder: string) {
  const res = await imagekit.upload({
    file: url, // remote URL
    fileName,
    folder,
  });

  return res.url; // ✅ store FULL url like your app does
}

async function seed() {
  console.log("Seeding database...");

  for (const book of dummybooks as any[]) {
    const coverUrl = await uploadToImageKit(
      book.coverUrl,
      `${book.title}.jpg`,
      "/books/covers"
    );
    const videoUrl = await uploadToImageKit(
      book.videoUrl,
      `${book.title}.mp4`,
      "/books/trailers"
    );

    await db.insert(books).values({
      title: book.title,
      author: book.author,
      genre: book.genre,
      rating: book.rating,
      coverUrl,
      coverColor: book.coverColor,
      description: book.description,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies ?? book.totalCopies,
      videoUrl,
      summary: book.summary,
    });
  }

  console.log("Database seeded successfully.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
