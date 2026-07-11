"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleRegistry, createStyleRegistry } from "styled-jsx";

/**
 * Collects all styled-jsx (<style jsx>) rules during server rendering and
 * injects them into the HTML before the content. Without this, pages render
 * unstyled for a moment (flash) until client-side JavaScript loads.
 * Pattern from the official Next.js CSS-in-JS guide.
 */
export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create the stylesheet once (lazy initial state)
  const [jsxStyleRegistry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles();
    jsxStyleRegistry.flush();
    return <>{styles}</>;
  });

  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>;
}
