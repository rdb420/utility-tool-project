// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Node >=22 ships its own global `localStorage` (undefined unless the
// --localstorage-file flag is set), so vitest's jsdom environment filters the
// real jsdom implementation off the test global. Bridge it back from the raw
// jsdom window the environment exposes as `globalThis.jsdom`.
const jsdomWindow = (globalThis as unknown as { jsdom: { window: Window } })
  .jsdom.window;
Object.defineProperty(globalThis, "localStorage", {
  get: () => jsdomWindow.localStorage,
  configurable: true,
});

// Mutable switch for the ads flag; everything else in the config is real.
const mockConfig = vi.hoisted(() => ({ adsEnabled: false }));

vi.mock("@/config/site", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/config/site")>();
  return {
    ...actual,
    get ADS_ENABLED() {
      return mockConfig.adsEnabled;
    },
  };
});

import AdSlot from "@/components/ads/AdSlot";
import { CONSENT_STORAGE_KEY } from "@/lib/consent/useConsent";

describe("AdSlot", () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockConfig.adsEnabled = false;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders nothing when ADS_ENABLED is false, even with consent", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    const { container } = render(<AdSlot slot="A" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the labelled reserved box for slot A when enabled + granted", () => {
    mockConfig.adsEnabled = true;
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    render(<AdSlot slot="A" />);
    const slot = screen.getByLabelText("Advertisement");
    expect(slot.getAttribute("data-ad-slot")).toBe("A");
    expect(screen.getByText("Advertisement")).toBeTruthy();
  });

  it("renders nothing while consent is unset or denied", () => {
    mockConfig.adsEnabled = true;
    const unset = render(<AdSlot slot="A" />);
    expect(unset.container.firstChild).toBeNull();
    unset.unmount();

    window.localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    const denied = render(<AdSlot slot="A" />);
    expect(denied.container.firstChild).toBeNull();
  });

  it("renders nothing for slots outside ENABLED_AD_SLOTS (B, C)", () => {
    mockConfig.adsEnabled = true;
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    const b = render(<AdSlot slot="B" />);
    expect(b.container.firstChild).toBeNull();
    b.unmount();
    const c = render(<AdSlot slot="C" />);
    expect(c.container.firstChild).toBeNull();
  });

  it("renders slot D when enabled + granted (jsdom has no IntersectionObserver, so the lazy fallback shows it)", () => {
    mockConfig.adsEnabled = true;
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    render(<AdSlot slot="D" />);
    expect(screen.getByLabelText("Advertisement").getAttribute("data-ad-slot")).toBe("D");
  });
});
