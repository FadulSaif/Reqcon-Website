import React from 'react';

/**
 * A visually hidden honeypot field.
 * Bots filling this will trigger a silent rejection.
 * Standardizes honeypot across all forms.
 */
export default function HoneypotField() {
  return (
    <input
      type="text"
      name="_honey_trap"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{
        display: 'none',
        position: 'absolute',
        opacity: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
