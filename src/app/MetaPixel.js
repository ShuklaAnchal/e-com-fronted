"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The base snippet lives in <head> (see layout.js); this component only
// tracks client-side route changes and renders the noscript fallback.
export default function MetaPixel({ pixelId }) {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  // The base snippet tracks the first PageView; track client-side route changes here
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
