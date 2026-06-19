import { describe, it, expect } from "vitest";
import { parseEnv, PREVIEW_CENTER_ID } from "../config/env";

describe("Environment Configuration Tests", () => {
    it("Preview mode uses deterministic mock center id", () => {
        const env = parseEnv({
            VITE_DATA_BACKEND: "preview"
        });
        expect(env.centerId).toBe(PREVIEW_CENTER_ID);
        expect(env.previewModeEnabled).toBe(true);
    });

    it("Supabase mode rejects missing VITE_CENTER_ID", () => {
        expect(() => {
            parseEnv({
                VITE_DATA_BACKEND: "supabase",
                VITE_SUPABASE_URL: "https://example.supabase.co",
                VITE_SUPABASE_PUBLISHABLE_KEY: "mock-key",
                VITE_BRANCH_MODE: "single"
            });
        }).toThrowError("MISSING_SINGLE_BRANCH_CENTER_ID");
    });

    it("Supabase mode rejects invalid VITE_CENTER_ID", () => {
        expect(() => {
            parseEnv({
                VITE_DATA_BACKEND: "supabase",
                VITE_SUPABASE_URL: "https://example.supabase.co",
                VITE_SUPABASE_PUBLISHABLE_KEY: "mock-key",
                VITE_BRANCH_MODE: "single",
                VITE_CENTER_ID: "invalid-uuid" // Not a UUID
            });
        }).toThrowError("MISSING_SINGLE_BRANCH_CENTER_ID");
    });

    it("Preview mock center id is not used in Supabase mode", () => {
        const env = parseEnv({
            VITE_DATA_BACKEND: "supabase",
            VITE_SUPABASE_URL: "https://example.supabase.co",
            VITE_SUPABASE_PUBLISHABLE_KEY: "mock-key",
            VITE_BRANCH_MODE: "single",
            VITE_CENTER_ID: "123e4567-e89b-12d3-a456-426614174000" // Valid UUID
        });
        expect(env.centerId).not.toBe(PREVIEW_CENTER_ID);
        expect(env.centerId).toBe("123e4567-e89b-12d3-a456-426614174000");
        expect(env.previewModeEnabled).toBe(false);
    });
});
