import { describe, expect, it } from "vitest";

/**
 * POS calculation invariants — must mirror the server RPC
 * (process_checkout_v1 in docs/SUPABASE_PHASE_10B_CHECKOUT_ACTIVATION.sql):
 *
 *   subtotal        = Σ(price × qty)
 *   loyaltyDiscount = clamp(loyaltyPoints, 0 .. subtotal - discount)   // 1 point = 1 OMR
 *   total           = max(0, subtotal - discount - loyaltyDiscount)
 *   earnedPoints    = floor(total)
 *
 * These mirror the exact expressions used in PosInvoicesPage so the UI
 * preview never disagrees with what the backend will persist.
 */

function subtotalOf(items: { price: number; qty?: number }[]): number {
  return items.reduce((s, it) => s + Number(it.price) * Number(it.qty ?? 1), 0);
}

function loyaltyDiscountOf(subtotal: number, discount: number, points: number, use: boolean): number {
  if (!use) return 0;
  return Math.max(0, Math.min(subtotal - discount, points));
}

function totalOf(subtotal: number, discount: number, loyalty: number): number {
  return Math.max(0, subtotal - discount - loyalty);
}

describe("POS calculations (mirror server RPC)", () => {
  it("subtotal multiplies price by quantity", () => {
    expect(subtotalOf([{ price: 5, qty: 3 }, { price: 2 }])).toBe(17);
  });

  it("loyalty point is worth 1 OMR (not 1/100)", () => {
    // 500 points on a 200 subtotal => capped at 200, not 5
    expect(loyaltyDiscountOf(200, 0, 500, true)).toBe(200);
    expect(loyaltyDiscountOf(50, 0, 30, true)).toBe(30);
  });

  it("loyalty discount is capped at subtotal minus manual discount", () => {
    expect(loyaltyDiscountOf(100, 20, 1000, true)).toBe(80);
  });

  it("loyalty discount is zero when not used", () => {
    expect(loyaltyDiscountOf(100, 0, 1000, false)).toBe(0);
  });

  it("total never goes negative", () => {
    const sub = subtotalOf([{ price: 10 }]);
    const loy = loyaltyDiscountOf(sub, 0, 1000, true);
    expect(totalOf(sub, 0, loy)).toBe(0);
  });

  it("earned points = floor(total)", () => {
    const sub = subtotalOf([{ price: 12.7, qty: 2 }]); // 25.4
    const total = totalOf(sub, 5, 0); // 20.4
    expect(Math.floor(total)).toBe(20);
  });
});
