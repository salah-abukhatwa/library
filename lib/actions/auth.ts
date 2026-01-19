"use server";

import { signIn, signOut } from "@/auth";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "@/lib/config";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error, "Sign in error");
    return { success: false, error: "Sign in failed" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId: Number(universityId), // IMPORTANT if your schema is integer
      universityCard,
    });

    // ✅ IMPORTANT: this URL must be PUBLIC in production (Vercel domain)
    if (process.env.NODE_ENV === "production") {
      await workflowClient.trigger({
        url: `${config.env.appUrl}/api/workflow`,
        body: { email, fullName },
      });
    }

    // optional auto sign-in
    await signInWithCredentials({ email, password });

    return { success: true, message: "Account created" };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, message: "Signup failed" };
  }
};

export const logout = async () => {
  await signOut();
  redirect("/sign-in");
};
