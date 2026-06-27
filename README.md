# Peony Collective - Architecture & Operations Manual

This repository contains the core application logic, database architecture, and frontend implementation for Peony Collective, a verified luxury second-hand marketplace.

The infrastructure is designed with a strict focus on security, scalability, and modern web standards. This document serves as the primary technical reference for current operations and future maintenance.

## 1. Technology Stack

* **Framework:** Next.js 15 (App Router paradigm)
* **Language:** TypeScript (Strict mode enabled)
* **Database & Authentication:** Supabase (PostgreSQL, Row Level Security)
* **Styling:** Tailwind CSS
* **Payment Gateway:** PayTR Integration (Server-side validated)
* **Email Infrastructure:** Resend API
* **Client Architecture:** Progressive Web App (PWA) with Service Worker caching

## 2. Directory Structure and Architectural Pattern

The project adheres to a modular component architecture. Separation of concerns is maintained strictly between server components (data fetching) and client components (interactivity).

* `/src/app`: Contains the Next.js App Router definitions. Routes are segmented by domain logic (e.g., `/admin`, `/checkout`, `/dashboard`).
* `/src/components`: Reusable UI components. Global state and DOM manipulations are isolated here using `"use client"`.
* `/src/utils`: Shared utilities, specifically Supabase client/server instantiation methods (`supabase/client.ts`, `supabase/server.ts`).
* `/src/context`: React Context providers (e.g., `CartContext.tsx`) for global state management.
* `/public`: Static assets, PWA manifests (`manifest.json`), and Service Workers (`sw.js`).
* `peony_schema.sql` & `supabase_rls_policies.sql`: Database schema definitions and crucial Row Level Security (RLS) policies.

## 3. Database and Security Standards

The application relies on PostgreSQL provided by Supabase. Direct client-to-database connections are permitted only through strictly defined Row Level Security (RLS) policies.

### Critical Security Implementations:
1. **Row Level Security (RLS):** All tables (`profiles`, `products`, `orders`) must have RLS enabled. Anonymous keys can only execute operations explicitly permitted by policy definitions.
2. **Server-Side Price Validation:** The checkout process (`/api/checkout/route.ts`) never trusts client-provided pricing. Prices are fetched directly from the database based on the product ID before initializing the payment gateway.
3. **Admin Authorization:** Administrative routes (`/admin/*`) are protected at the layout level (`src/app/admin/layout.tsx`). The system verifies the user's role directly from the `profiles` table via a secure server call.

## 4. Development and Deployment Setup

### Prerequisites
* Node.js (v18.0.0 or higher recommended)
* NPM or Yarn package manager
* A configured Supabase project

### Initialization
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure Environment Variables:
   Create a `.env.local` file in the root directory. Required keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=<Supabase_Project_URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase_Anon_Key>
   ```

3. Database Initialization:
   Execute the `peony_schema.sql` and `supabase_rls_policies.sql` scripts within your Supabase SQL Editor to construct the schema and enforce security boundaries.

4. Start the Development Server:
   ```bash
   npm run dev
   ```

## 5. Maintenance Guidelines for Future Developers

* **Type Safety:** Always define comprehensive interfaces in `src/types/index.ts`. Avoid using `any`.
* **Component Abstraction:** If a component exceeds 300 lines or handles multiple distinct domain logic operations, refactor it into smaller sub-components.
* **API Routes:** Keep serverless functions within `/src/app/api` strictly for operations requiring secret keys (e.g., Resend, PayTR) or complex database transactions. Standard CRUD operations should utilize Supabase Server Actions where possible.
* **Documentation:** Ensure all new utility functions and complex React components are documented using standard TSDoc conventions.

---
*Maintained by the Peony Collective IT Department.*
