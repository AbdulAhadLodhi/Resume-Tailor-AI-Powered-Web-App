# ✅ Resume Tailor AI – Nexium Grand Sprint Project Brief

## 🧠 **Project Overview**

**Resume Tailor AI** is an AI-powered web application designed to generate customized, job-specific resumes for users based on their personal and professional input. The user provides their email to receive a magic link for login. Once authenticated, the user can input career goals, job descriptions, and experience to generate a tailored resume aligned with their target job.

---

## 🎯 **Objective**

The goal of this project is to fulfill the final sprint requirement of the **Nexium Fellowship Program** by:

* Demonstrating full-stack project development ability
* Using approved tools and technologies
* Practicing version control, modular code, and deployment strategy
* Delivering a polished, professional, and working application with complete frontend, backend, and authentication integration.

---

## 📋 **Requirements by Nexium**

* A full-stack web app built using **Next.js** (React-based framework)
* Backend functionality using **Supabase** (for Auth + DB)
* User authentication (preferably OTP/magic link)
* Styled with **Tailwind CSS**
* Hosted on a public URL
* Version control using **Git + GitHub**
* Demonstrated in a final presentation (well-structured, bug-free)

---

## 🛠️ **Technologies to Use**

| Layer           | Technology                     |
| --------------- | ------------------------------ |
| Frontend        | Next.js (v13+ App Router)      |
| Styling         | Tailwind CSS                   |
| Backend / Auth  | Supabase (Auth + DB)           |
| IDE             | Replit                         |
| Deployment      | Vercel (preferred for Next.js) |
| Version Control | Git + GitHub                   |

---

## 💻 **IDE / Environment**

You are using [**Replit**](https://replit.com) to develop this project.
**Note:** Replit supports Next.js, environment variables via `.env`, and preview through internal port mapping (e.g., 3000 or 3001).

---

## 🗺️ **Roadmap (Step-by-Step Build)**

1. **Project Setup** ✅
   * Initialize Next.js (App Router) on Replit
   * Setup folder structure: `/app`, `/lib`, `/styles`, etc.

2. **Tailwind CSS Setup** ✅
   * Install Tailwind and configure it properly with `tailwind.config.js`, `globals.css`

3. **Supabase Integration** ✅
   * Create project on [Supabase](https://supabase.com)
   * Enable Email Auth (magic link)
   * Connect Supabase to your Next.js app via `supabase.ts` client

4. **Authentication Page** ✅
   * Build a login form using magic link
   * Show messages for success/failure

5. **Protected Page (Resume Builder)** ✅
   * Allow only logged-in users
   * Collect resume input from user

6. **Resume Generator Logic** 🔄 (In Progress)
   * Use OpenAI (optional) or create logic to generate tailored resume based on input
   * Show final resume on screen with option to download

7. **Styling and UX** 🔄 (In Progress)
   * Apply Tailwind for responsive and clean UI
   * Use transitions, error handling, and loading states

8. **Deployment** ✅
   * Deploy using **Vercel** (recommended for Next.js)
   * Set up environment variables in Vercel dashboard
   * Connect to GitHub for CI/CD

9. **Documentation & Presentation** 📋 (Planned)
   * Prepare a README file for GitHub
   * Write short usage instructions
   * Record demo or prepare live demo walkthrough

---

## 🌍 **Deployment Target**

* **Primary Target**: [**Vercel**](https://vercel.com) – easy Next.js hosting
* **Alternative (Backup)**: Replit's built-in hosting (only for dev/testing)

---

## 📦 **Resources to Be Utilized**

* [Supabase Docs](https://supabase.com/docs)
* [Next.js Docs](https://nextjs.org/docs)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [Vercel Deployment Guide](https://vercel.com/docs)

---

## 🧩 **File & Folder Structure**

```
/app
  └── page.tsx               # Homepage/Login
  └── login/page.tsx         # Login page
  └── dashboard/page.tsx     # Protected resume builder page
  └── auth/callback/route.ts # Auth callback handler
  └── layout.tsx             # Root layout
  └── globals.css            # Global styles

/lib
  └── supabaseClient.ts      # Supabase client instance

/docs
  └── PROJECT_PLAN.md        # This file

.env.local                   # Environment variables (SUPABASE_URL, SUPABASE_ANON_KEY)
tailwind.config.js
postcss.config.js
tsconfig.json
next.config.js
```

