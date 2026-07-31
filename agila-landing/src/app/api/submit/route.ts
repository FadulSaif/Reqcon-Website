import { NextResponse } from "next/server";
import { FORM_CONFIG } from "@/config/formConfig";

const MAX_REQUEST_BYTES = 16_384;
const MAX_FIELD_LENGTH = 4_000;
const REQUIRED_FIELDS = ["Full name", "Email address", "Message"] as const;

type FormBody = Record<string, unknown> & { turnstileToken?: unknown };

function response(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function validatePayload(payload: Record<string, unknown>): string | null {
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value !== "string") return `Invalid field type: ${key}`;
    if (key.length > 100 || value.length > MAX_FIELD_LENGTH) return "A form field exceeds the allowed length";
  }
  for (const field of REQUIRED_FIELDS) {
    if (typeof payload[field] !== "string" || !payload[field].trim()) return `Missing required field: ${field}`;
  }
  const email = String(payload["Email address"]);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return "Invalid email address";
  return null;
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return response({ success: false, error: "Content-Type must be application/json" }, 415);
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > MAX_REQUEST_BYTES) {
      return response({ success: false, error: "Request is too large" }, 413);
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) {
      return response({ success: false, error: "Request is too large" }, 413);
    }

    let body: FormBody;
    try {
      body = JSON.parse(rawBody) as FormBody;
    } catch {
      return response({ success: false, error: "Invalid JSON" }, 400);
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return response({ success: false, error: "Invalid form payload" }, 400);
    }

    if (body._honey_trap || body._honey || body.botcheck) {
      return response({ success: true, message: "Form submitted successfully" }, 200);
    }

    const { turnstileToken, ...formPayload } = body;
    if (typeof turnstileToken !== "string" || !turnstileToken.trim()) {
      return response({ success: false, error: "Missing human verification token" }, 400);
    }
    if (turnstileToken.length > 2_048) {
      return response({ success: false, error: "Invalid human verification token" }, 400);
    }

    const validationError = validatePayload(formPayload);
    if (validationError) return response({ success: false, error: validationError }, 400);

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error("Contact form unavailable: TURNSTILE_SECRET_KEY is not configured");
      return response({ success: false, error: "Server configuration error" }, 503);
    }

    const verifyForm = new URLSearchParams({ secret: secretKey, response: turnstileToken });
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (forwardedFor) verifyForm.set("remoteip", forwardedFor);

    let turnstileRes: Response;
    try {
      turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: verifyForm,
        signal: AbortSignal.timeout(8_000),
        cache: "no-store",
      });
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === "TimeoutError";
      console.error(timedOut ? "Turnstile verification timed out" : "Turnstile verification service unavailable");
      return response({ success: false, error: timedOut ? "Human verification timed out" : "Human verification service unavailable" }, timedOut ? 504 : 502);
    }
    if (!turnstileRes.ok) {
      console.error(`Turnstile verification service returned HTTP ${turnstileRes.status}`);
      return response({ success: false, error: "Human verification service unavailable" }, 502);
    }

    const turnstileData = (await turnstileRes.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!turnstileData.success) {
      console.warn("Turnstile verification rejected a contact request", turnstileData["error-codes"] || []);
      return response({ success: false, error: "Human verification failed. Please try again." }, 403);
    }

    const formSubmitUrl = `${FORM_CONFIG.endpoint}/${encodeURIComponent(FORM_CONFIG.targetEmail)}`;
    let formSubmitRes: Response;
    try {
      formSubmitRes = await fetch(formSubmitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formPayload),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      });
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === "TimeoutError";
      console.error(timedOut ? "Form delivery service timed out" : "Form delivery service unavailable");
      return response({ success: false, error: timedOut ? "Email delivery service timed out" : "Email delivery service unavailable" }, timedOut ? 504 : 502);
    }
    if (!formSubmitRes.ok) {
      console.error(`Form delivery service returned HTTP ${formSubmitRes.status}`);
      return response({ success: false, error: "Email delivery service failed" }, 502);
    }

    return response({ success: true }, 200);
  } catch {
    console.error("Contact form request failed");
    return response({ success: false, error: "Internal server error" }, 500);
  }
}
