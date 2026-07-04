"use client";

import { openPreferences } from "@/lib/consent/cmp";

/**
 * Opens the consentmanager preference manager so visitors can change or withdraw
 * consent at any time (a compliance requirement). Uses the public consentmanager
 * JS API (`__cmp('showScreenAdvanced')`); a no-op until the CMP has loaded.
 */
export default function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={openPreferences}>
      Cookie settings
    </button>
  );
}
