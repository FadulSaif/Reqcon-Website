import { NextResponse } from 'next/server';
import { FORM_CONFIG } from '@/config/formConfig';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Check honeypot fields
    if (body._honey_trap || body._honey || body.botcheck) {
      // Silently succeed for bots
      return NextResponse.json({ success: true, message: 'Form submitted successfully' });
    }

    const { turnstileToken, ...formPayload } = body;

    // 2. Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json({ success: false, error: 'Missing human verification token' }, { status: 400 });
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error('TURNSTILE_SECRET_KEY is not configured');
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    const verifyForm = new URLSearchParams();
    verifyForm.append('secret', secretKey);
    verifyForm.append('response', turnstileToken);

    // Optionally check remote IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
      verifyForm.append('remoteip', forwardedFor.split(',')[0]);
    }

    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: verifyForm,
    });
    
    const turnstileData = await turnstileRes.json();
    
    if (!turnstileData.success) {
      console.error('Turnstile verification failed:', turnstileData);
      return NextResponse.json({ success: false, error: 'Human verification failed. Please try again.' }, { status: 403 });
    }

    // 3. Forward to FormSubmit
    const formSubmitUrl = `${FORM_CONFIG.endpoint}/${FORM_CONFIG.targetEmail}`;
    
    const formSubmitRes = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formPayload),
    });

    if (!formSubmitRes.ok) {
      const errorText = await formSubmitRes.text();
      console.error('FormSubmit error:', errorText);
      return NextResponse.json({ success: false, error: 'Email delivery service failed' }, { status: formSubmitRes.status });
    }

    const formSubmitData = await formSubmitRes.json();

    return NextResponse.json(formSubmitData);

  } catch (error) {
    console.error('API /submit error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
