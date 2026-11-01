import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_REFLECTION_LENGTH = 2000;
const REFLECTIONS_PAGE_SIZE = 20;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) return null;
  return { url, secretKey };
}

function unavailable() {
  return NextResponse.json({ error: "Reflections are not available right now." }, { status: 503 });
}

export async function GET(request: Request) {
  const config = getSupabaseConfig();
  if (!config) return unavailable();

  const offset = Number(new URL(request.url).searchParams.get("offset") ?? "0");
  if (!Number.isSafeInteger(offset) || offset < 0) {
    return NextResponse.json({ error: "Invalid page." }, { status: 400 });
  }

  try {
    const query = new URLSearchParams({
      select: "id,name,text,created_at",
      status: "eq.approved",
      order: "created_at.desc,id.asc",
      limit: String(REFLECTIONS_PAGE_SIZE + 1),
      offset: String(offset),
    });
    const response = await fetch(`${config.url}/rest/v1/reflections?${query}`, {
      headers: {
        apikey: config.secretKey,
        Authorization: `Bearer ${config.secretKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return unavailable();
    const rows = (await response.json()) as Array<{ id: string; name: string; text: string; created_at: string }>;
    return NextResponse.json({
      reflections: rows.slice(0, REFLECTIONS_PAGE_SIZE),
      hasMore: rows.length > REFLECTIONS_PAGE_SIZE,
    }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return unavailable();
  }
}

export async function POST(request: Request) {
  const config = getSupabaseConfig();
  if (!config) return unavailable();

  let payload: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 12_000) {
      return NextResponse.json({ error: "Your reflection is too long." }, { status: 413 });
    }
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const fields = payload as Record<string, unknown>;
  // Silently discard automated form fills that trip the hidden honeypot.
  if (typeof fields.website === "string" && fields.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim().toLowerCase() : "";
  const text = typeof fields.text === "string" ? fields.text.trim() : "";
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (
    !name || name.length > MAX_NAME_LENGTH ||
    !emailIsValid || email.length > MAX_EMAIL_LENGTH ||
    !text || text.length > MAX_REFLECTION_LENGTH ||
    fields.consent !== true
  ) {
    return NextResponse.json({ error: "Please complete each field and agree to the note about publication." }, { status: 400 });
  }

  try {
    const response = await fetch(`${config.url}/rest/v1/reflections`, {
      method: "POST",
      headers: {
        apikey: config.secretKey,
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name, email, text, status: "pending" }),
      cache: "no-store",
    });

    if (!response.ok) return unavailable();
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return unavailable();
  }
}
