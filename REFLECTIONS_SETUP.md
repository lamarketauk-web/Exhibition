# Persistent visitor reflections

The reflections form uses a small Supabase Postgres table through the Next.js server API. New submissions are stored as `pending`; only `approved` reflections are returned to the public page. Email addresses are never returned to the browser.

## 1. Create the table

Create a Supabase project, open its **SQL Editor**, and run [`supabase/reflections.sql`](supabase/reflections.sql). This creates the table, enables row-level security, blocks direct access by public roles, and keeps the five existing sample reflections as approved legacy entries. Those legacy entries have no email address because one was not collected.

## 2. Add the server keys

Copy `.env.example` to `.env.local`. In your Supabase project's **Connect** dialog or **Settings → API Keys**, copy the project URL and a **secret** key into the two environment variables. Keep `SUPABASE_SECRET_KEY` private: it is used only by the server and must never be renamed with a `NEXT_PUBLIC_` prefix or committed to Git.

Restart the local Next.js server after changing `.env.local`.

## 3. Connect the deployed site

Add the same `SUPABASE_URL` and `SUPABASE_SECRET_KEY` values as environment variables in the Vercel project, for every environment where the reflections page should work. Redeploy after saving them.

## 4. Approve submissions

Open the `reflections` table in Supabase's **Table Editor**. Review pending rows, then change a row's `status` from `pending` to `approved` to publish it, or to `rejected` to keep it off the public page. The visitor's email remains in the table and is never shown on the site.

The public page displays up to 100 approved reflections, newest first. The form requires a name, email address, and consent to publish the name and reflection. It also uses length limits and a hidden honeypot field; add a stronger rate limit or CAPTCHA if automated spam becomes a problem.
