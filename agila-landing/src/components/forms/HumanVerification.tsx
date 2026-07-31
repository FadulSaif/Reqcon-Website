"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface HumanVerificationProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

export default function HumanVerification({ onVerify, onExpire, className = "" }: HumanVerificationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Function to render the widget
    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA", // fallback to Cloudflare testing key
            callback: (token: string) => onVerify(token),
            "expired-callback": () => {
              if (onExpire) onExpire();
            },
            theme: "auto",
          });
        } catch (e) {
          console.error("Turnstile render error", e);
        }
      }
    };

    // If turnstile is already loaded, render immediately
    if (window.turnstile) {
      renderWidget();
    } else {
      // Otherwise wait for the script's onload event
      window.onloadTurnstileCallback = renderWidget;
    }

    return () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onVerify, onExpire]);

  return (
    <div className={`cf-turnstile-wrapper flex justify-center w-full ${className}`}>
      <div ref={containerRef} className="min-h-[65px]"></div>
      <Script 
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback" 
        strategy="afterInteractive" 
      />
    </div>
  );
}

// Add types for window.turnstile
declare global {
  interface TurnstileWidgetOptions {
    sitekey: string;
    callback: (token: string) => void;
    "expired-callback": () => void;
    theme: "auto" | "light" | "dark";
  }

  interface TurnstileApi {
    render(container: HTMLElement, options: TurnstileWidgetOptions): string;
    remove(widgetId: string): void;
  }

  interface Window {
    turnstile?: TurnstileApi;
    onloadTurnstileCallback: () => void;
  }
}
