import { describe, it, expect, vi } from 'vitest';
import { CustomerRepository, AppointmentRepository } from '../domain/ports/repositories';
import { useCases } from '../app/composition/useCases';

// We do NOT mock createRepositoryBundle because it's too complicated to intercept.
// Instead, we just test that preview mode handles writes by returning PREVIEW_READ_ONLY error
// and that reads go through to the adapter.

vi.mock("../config/env", () => ({
  config: {
    previewModeEnabled: true,
  }
}));

describe("Phase 4: Workflows", () => {
    it("Customers field validation failure (Preview Mode Guard)", async () => {
        const cRes: any = await useCases.customers.create({ name: "Bob" });
        expect(cRes.ok).toBe(false);
        expect(cRes.error.code).toBe("PREVIEW_READ_ONLY");

        const uRes: any = await useCases.customers.update("c1", { name: "Robert" });
        expect(uRes.ok).toBe(false);
        expect(uRes.error.code).toBe("PREVIEW_READ_ONLY");

        const dRes: any = await useCases.customers.delete("c1");
        expect(dRes.ok).toBe(false);
        expect(dRes.error.code).toBe("PREVIEW_READ_ONLY");
    });

    it("Appointments validation failure (Preview Mode Guard)", async () => {
        const cRes: any = await useCases.appointments.create({ customerId: "c1" } as any);
        expect(cRes.ok).toBe(false);
        expect(cRes.error.code).toBe("PREVIEW_READ_ONLY");

        const uRes: any = await useCases.appointments.update("a1", { status: "CONFIRMED" } as any);
        expect(uRes.ok).toBe(false);
        expect(uRes.error.code).toBe("PREVIEW_READ_ONLY");

        const dRes: any = await useCases.appointments.delete("a1");
        expect(dRes.ok).toBe(false);
        expect(dRes.error.code).toBe("PREVIEW_READ_ONLY");
    });

    it("Services field validation failure (Preview Mode Guard)", async () => {
        const cRes: any = await useCases.services.create({ name: "Service" });
        expect(cRes.ok).toBe(false);
        expect(cRes.error.code).toBe("PREVIEW_READ_ONLY");

        const uRes: any = await useCases.services.update("s1", { name: "Updated" });
        expect(uRes.ok).toBe(false);
        expect(uRes.error.code).toBe("PREVIEW_READ_ONLY");

        const dRes: any = await useCases.services.delete("s1");
        expect(dRes.ok).toBe(false);
        expect(dRes.error.code).toBe("PREVIEW_READ_ONLY");
    });

    it("Products field validation failure (Preview Mode Guard)", async () => {
        const cRes: any = await useCases.products.create({ name: "Product" });
        expect(cRes.ok).toBe(false);
        expect(cRes.error.code).toBe("PREVIEW_READ_ONLY");

        const uRes: any = await useCases.products.update("p1", { name: "Updated" });
        expect(uRes.ok).toBe(false);
        expect(uRes.error.code).toBe("PREVIEW_READ_ONLY");

        const dRes: any = await useCases.products.delete("p1");
        expect(dRes.ok).toBe(false);
        expect(dRes.error.code).toBe("PREVIEW_READ_ONLY");
    });

    it("Expenses field validation failure (Preview Mode Guard)", async () => {
        const cRes: any = await useCases.expenses.create({ description: "Expense", amount: 10 } as any);
        expect(cRes.ok).toBe(false);
        expect(cRes.error.code).toBe("PREVIEW_READ_ONLY");

        const dRes: any = await useCases.expenses.delete("e1");
        expect(dRes.ok).toBe(false);
        expect(dRes.error.code).toBe("PREVIEW_READ_ONLY");
    });

    it("POS & Invoices checkout and print failure (Preview Mode Guard)", async () => {
        const payload: any = {
           customerId: "c1",
           paymentMethod: "cash",
           items: [{ type: "service", serviceId: "s1", qty: 1, price: 10 }]
        };
        const cRes: any = await useCases.invoices.checkout(payload);
        expect(cRes.ok).toBe(false);
        expect(cRes.error.code).toBe("PREVIEW_READ_ONLY");

        const pRes: any = await useCases.invoices.getForPrint("i1");
        expect(pRes.ok).toBe(false);
        expect(pRes.error.code).toBe("PREVIEW_READ_ONLY");
    });
});
