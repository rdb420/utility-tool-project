import type { Metadata } from "next";
import Script from "next/script";
import Prose from "@/components/layout/Prose";
import { CONTACT_EMAIL, SITE_NAME } from "@/config/site";

/** Static route (SSG); the consentmanager widgets below hydrate client-side. */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How OpsCrunch handles data: calculator inputs never leave your browser. Cookie, consent, and third-party vendor details are provided by our consent management platform (consentmanager).",
  alternates: { canonical: "/privacy-policy/" },
};

/** consentmanager CMP 173918. */
const CMP_CDID = "3ba155ac627e4";
const VENDOR_LIST_API = `https://c.delivery.consentmanager.net/delivery/vendorlist.php?cdid=${CMP_CDID}&api=json`;

/**
 * Vendor list, fetched at build time so it ships in the static HTML. The API
 * returns a JSON array; we defensively pull any vendor names out of it and fall
 * back to a note + link if it is empty or unreachable at build time.
 */
async function getVendorNames(): Promise<string[]> {
  try {
    const res = await fetch(VENDOR_LIST_API, {
      cache: "force-cache",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    const names: string[] = [];
    const walk = (node: unknown): void => {
      if (Array.isArray(node)) {
        node.forEach(walk);
      } else if (node && typeof node === "object") {
        for (const [key, value] of Object.entries(node)) {
          if ((key === "name" || key === "vendorname") && typeof value === "string") {
            names.push(value);
          } else {
            walk(value);
          }
        }
      }
    };
    walk(data);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

export default async function PrivacyPolicyPage() {
  const vendors = await getVendorNames();

  return (
    <Prose>
      <h1>Privacy policy</h1>
      <p>
        {SITE_NAME} is operated from Australia. The essentials: there are no
        accounts, and <strong>your calculator inputs never leave your
        browser</strong> — every calculation runs on your device, so the numbers
        you type are never sent to us, stored on a server, or included in
        analytics. The cookie, consent, and third-party vendor details below are
        provided and kept current by our consent management platform,{" "}
        <strong>consentmanager</strong> (consentmanager.net).
      </p>

      {/* consentmanager — generated privacy policy content (CMP 173918). */}
      <div className={`cmppolicy${CMP_CDID} cmpstyleroot`} />
      <Script
        src={`https://c.delivery.consentmanager.net/delivery/pcpinfo.php?cdid=${CMP_CDID}&format=simple&lang=automatic`}
        strategy="afterInteractive"
      />

      <h2>Cookies</h2>
      {/* consentmanager — cookie list. */}
      <div className={`cmpcookieinfo${CMP_CDID} cmpstyleroot`} />
      <Script
        src={`https://c.delivery.consentmanager.net/delivery/cookieinfo.php?cdid=${CMP_CDID}&l=automatic`}
        strategy="afterInteractive"
      />

      <h2>Manage your consent</h2>
      <p>Review or change the choices you have made:</p>
      {/* consentmanager — inline preferences box. Populated by the consentmanager
          CMP loader when it is present on the site. */}
      <link
        rel="stylesheet"
        href="https://c.delivery.consentmanager.net/delivery/cmpinline.min.css"
      />
      <div id="cmpinlinepreferencesbox" />

      <h2>Third-party vendors</h2>
      {vendors.length > 0 ? (
        <ul>
          {vendors.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>
          No third-party vendors are currently listed. The current list is
          available from consentmanager{" "}
          <a href={VENDOR_LIST_API} rel="nofollow noopener" target="_blank">
            here
          </a>
          .
        </p>
      )}

      <h2>Contact</h2>
      <p>
        Privacy questions go to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We answer under
        the GDPR, the California Privacy Rights Act, or the Australian Privacy
        Act as applies to you.
      </p>
    </Prose>
  );
}
