"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function updateUserRole(userId: string, role: "USER" | "ADMIN") {
  try {
    await db.update(users).set({ role }).where(eq(users.id, userId));
    return { success: true as const };
  } catch (error) {
    console.log("updateUserRole error:", error);
    return { success: false as const, error: "Failed to update role" };
  }
}

/**
 * Safer than deleting (because borrow records reference users).
 * This matches real admin systems better.
 */
export async function suspendUser(userId: string) {
  try {
    await db
      .update(users)
      .set({ status: "SUSPENDED" })
      .where(eq(users.id, userId));
    return { success: true as const };
  } catch (error) {
    console.log("suspendUser error:", error);
    return { success: false as const, error: "Failed to suspend user" };
  }
}
