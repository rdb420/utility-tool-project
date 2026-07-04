// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

describe("AdSlot", () => {
  beforeEach(() => {
    mockConfig.adsEnabled = false;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders nothing when ADS_ENABLED is false", () => {
    const { container } = render(<AdSlot slot="A" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the labelled reserved box for slot A when enabled", () => {
    mockConfig.adsEnabled = true;
    render(<AdSlot slot="A" />);
    const slot = screen.getByLabelText("Advertisement");
    expect(slot.getAttribute("data-ad-slot")).toBe("A");
    expect(screen.getByText("Advertisement")).toBeTruthy();
  });

  it("renders nothing for slots outside ENABLED_AD_SLOTS (B, C)", () => {
    mockConfig.adsEnabled = true;
    const b = render(<AdSlot slot="B" />);
    expect(b.container.firstChild).toBeNull();
    b.unmount();
    const c = render(<AdSlot slot="C" />);
    expect(c.container.firstChild).toBeNull();
  });

  it("renders slot D when enabled (jsdom has no IntersectionObserver, so the lazy fallback shows it)", () => {
    mockConfig.adsEnabled = true;
    render(<AdSlot slot="D" />);
    expect(
      screen.getByLabelText("Advertisement").getAttribute("data-ad-slot"),
    ).toBe("D");
  });
});
