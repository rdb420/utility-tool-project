/**
 * Site-wide configuration. Values come from NEXT_PUBLIC_* env vars
 * (see .env.example) with safe fallbacks for local development.
 */

export const SITE_NAME = "OpsCrunch";

/** Canonical origin, no trailing slash. */
export const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://opscrunch.com"
).replace(/\/$/, "");

/** Master switch for ad slots; ads also require consent (Chunk F). */
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

/** Only these ad slots are ever placed on a page (see MVP page specs). */
export const ENABLED_AD_SLOTS = ["A", "D"] as const;
export type AdSlotId = (typeof ENABLED_AD_SLOTS)[number];

/** Google Analytics 4 measurement id; empty string disables analytics. */
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

/**
 * Google Tag Manager container id. When set, GTM loads and owns GA4 (config +
 * event tags built in the GTM UI); the app only pushes typed events to the
 * dataLayer. Empty string disables GTM.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

/** Contact address used on the contact page and in the footer. */
export const CONTACT_EMAIL = "hello@opscrunch.com"; // TODO: confirm mailbox before launch
