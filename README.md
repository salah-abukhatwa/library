# NextLibrary — University Library Management System

A production-grade **university library management system** built with **Next.js + TypeScript**.  
It includes **two interconnected apps (User + Admin)** inside one codebase, with secure authentication, admin-only access control, media uploads, and automated email workflows.

## Live Demo
- **User App:** https://library-inky-five.vercel.app  

---

## Overview
NextLibrary is designed to demonstrate real-world patterns:
- Monorepo-style structure for **User + Admin** experiences
- Server-side protected admin routes (RBAC)
- PostgreSQL + ORM database layer
- Media uploads (university cards) + workflow emails
- Deployment-ready setup for production

---

## Key Features

### User App
- Sign up / sign in with validated form inputs  
- Upload **University ID Card** during onboarding (ImageKit)
- Browse and search books
- Borrow books (records tracked in database)

### Admin App
- Admin-only routes protected server-side
- Manage books (Create / Update / Delete)
- View users
- Dashboard stats (Total Users / Total Books / Borrowed Books)
- Borrowed books listing for monitoring activity

---

## Tech Stack
- **Framework:** Next.js (App Router) + TypeScript  
- **Auth:** Auth.js (Credentials) + RBAC (Admin-only access)  
- **Database:** Neon Postgres + Drizzle ORM  
- **Media:** ImageKit (uploads, transformations, asset delivery)  
- **Workflows / Cache:** Upstash (Redis + workflows / triggers)  
- **Email:** Resend (welcome + inactivity emails)  
- **UI:** Tailwind CSS + shadcn/ui + Sonner (toasts)  
- **Deployment:** Vercel

---

## Automated Workflows
- Welcome email is sent right after signup.
- Inactivity check: if a user doesn’t visit for **3 days**, an automated reminder email is sent.

---
