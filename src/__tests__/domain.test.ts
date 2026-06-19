import { describe, it, expect, vi } from 'vitest';

vi.mock("../config/env", async (importOriginal) => {
  const actual = await importOriginal<typeof import('../config/env')>();
  return {
    ...actual,
    config: {
      backend: "preview",
      branchMode: "single",
      centerId: "test-center-123",
      previewModeEnabled: true,
      supabaseUrl: undefined,
      supabasePublishableKey: undefined,
    }
  };
});

import { can, UserRole } from '../domain/entities/Session';
import { useCases } from '../app/composition/useCases';
import { mapErrorToMessage } from '../application/errors/ErrorMapper';
import { validateCheckoutPayload } from '../application/dto';

function isFailureResult(res: any): res is { ok: false; error: { code: string } } {
  return res && res.ok === false && res.error && typeof res.error === 'object';
}

describe("Authorization Rules", () => {
  it("Admin should be able to view revenue", () => {
    const session = {
      status: "authenticated" as const,
      session: {
        user: { id: "1", username: "admin", role: UserRole.ADMIN }
      }
    };
    expect(can(session, "revenue.view")).toBe(true);
  });

  it("Staff should not be able to view settings", () => {
    const session = {
      status: "authenticated" as const,
      session: {
        user: { id: "2", username: "staff", role: UserRole.STAFF }
      }
    };
    expect(can(session, "settings.view")).toBe(false);
  });

  it("Preview user should be able to view settings", () => {
    const session: any = {
      status: "preview",
      session: {
        user: { id: "preview-user-id", username: "preview", role: UserRole.PREVIEW, name: "Preview User" }
      }
    };
    expect(can(session, "settings.view")).toBe(true);
  });
});

describe("Preview-Mode Safety", () => {
    it("Should reject writes in preview mode", async () => {
        // useCases config has previewModeEnabled=true by default via .env if VITE_ENABLE_PREVIEW_MODE="true", or we bypass
        // In preview mode adapters usually return PREVIEW_READ_ONLY on updates anyway!
        const result = await useCases.customers.create({ name: "Test", phone: "123" });
        expect(result.ok).toBe(false);
        if (isFailureResult(result)) {
           expect(result.error.code).toBe("PREVIEW_READ_ONLY");
        }
    });
});

describe("Error Mapping", () => {
  it("Maps INVALID_CREDENTIALS correctly", () => {
    const message = mapErrorToMessage({ code: "INVALID_CREDENTIALS" });
    expect(message).toBe("بيانات الاعتماد غير صحيحة.");
  });

  it("Maps PREVIEW_READ_ONLY correctly", () => {
    const message = mapErrorToMessage({ code: "PREVIEW_READ_ONLY" });
    expect(message).toBe("وضع المعاينة (Preview) يسمح بالقراءة فقط. لا يمكن حفظ التعديلات.");
  });

  it("Falls back to generic error message", () => {
    const message = mapErrorToMessage({ code: "UNKNOWN_ERROR", message: "foo" });
    expect(message).toBe("foo"); // ErrorMapper might fall back to .message
  });
});

describe("Checkout Payload Validation", () => {
  it("Should reject undefined or empty payloads", () => {
    const errors = validateCheckoutPayload(null);
    expect(errors).toContain("Payload is required");
  });

  it("Should reject payloads missing customerId", () => {
    const errors = validateCheckoutPayload({ items: [] });
    expect(errors).toContain("Customer details are missing");
  });

  it("Should reject empty items list", () => {
    const errors = validateCheckoutPayload({ customerId: "cust-1", items: [] });
    expect(errors).toContain("Cart must not be empty");
  });

  it("Should reject service items without serviceId", () => {
    const errors = validateCheckoutPayload({
      customerId: "cust-1",
      paymentMethod: "cash",
      items: [{ type: "service", qty: 1, price: 5.0 }]
    });
    expect(errors.some(e => e.includes("is missing serviceId"))).toBe(true);
  });

  it("Should reject product items without productId", () => {
    const errors = validateCheckoutPayload({
      customerId: "cust-1",
      paymentMethod: "cash",
      items: [{ type: "product", qty: 1, price: 8.0 }]
    });
    expect(errors.some(e => e.includes("is missing productId"))).toBe(true);
  });

  it("Should reject items with sub-zero or zero quantity", () => {
    const errors = validateCheckoutPayload({
      customerId: "cust-1",
      paymentMethod: "cash",
      items: [{ type: "product", productId: "p-1", qty: 0, price: 8.0 }]
    });
    expect(errors.some(e => e.includes("must have a positive quantity"))).toBe(true);
  });

  it("Should accept correct checkout payload", () => {
    const errors = validateCheckoutPayload({
      customerId: "cust-1",
      paymentMethod: "cash",
      items: [
        { type: "service", serviceId: "s-1", qty: 1, price: 10.0 },
        { type: "product", productId: "p-2", qty: 2, price: 5.0 }
      ]
    });
    expect(errors.length).toBe(0);
  });
});
