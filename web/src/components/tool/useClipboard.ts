"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Toast display duration, matching the mockup's 1400ms. */
const TOAST_MS = 1400;

async function writeClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the textarea fallback.
    }
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Clipboard writes with a self-expiring toast message.
 * navigator.clipboard first, hidden-textarea execCommand fallback.
 */
export function useClipboard(duration = TOAST_MS) {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      const ok = await writeClipboard(text);
      setToast(ok ? "Copied" : "Copy failed");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), duration);
      return ok;
    },
    [duration],
  );

  return { toast, copy };
}
