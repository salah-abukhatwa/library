"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log("Error creating book:", error);
    return { success: false, error: "Error creating book" };
  }
};

export const updateBook = async (bookId: string, params: BookParams) => {
  try {
    const updated = await db
      .update(books)
      .set({
        ...params,
        // keep availableCopies in sync if you want simple logic:
        availableCopies: params.totalCopies,
      })
      .where(eq(books.id, bookId))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updated[0])),
    };
  } catch (error) {
    console.log("Error updating book:", error);
    return { success: false, error: "Error updating book" };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    await db.delete(books).where(eq(books.id, bookId));

    return { success: true };
  } catch (error) {
    console.log("Error deleting book:", error);
    return {
      success: false,
      error: "Error deleting book",
    };
  }
};
