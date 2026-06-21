import { describe, it, expect } from "vitest";
import { EnvironmentConfigurationError, parseEnv } from "../config/env";

describe("Environment Configuration Tests", () => {
    it("Preview mode is rejected", () => {
        expect(() => parseEnv({
            VITE_DATA_BACKEND: "preview"
        })).toThrowError(EnvironmentConfigurationError);
    });

    it("Missing backend mode is rejected", () => {
        expect(() => parseEnv({})).toThrowError(EnvironmentConfigurationError);
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

    it("Supabase mode uses the configured center id", () => {
        const env = parseEnv({
            VITE_DATA_BACKEND: "supabase",
            VITE_SUPABASE_URL: "https://example.supabase.co",
            VITE_SUPABASE_PUBLISHABLE_KEY: "mock-key",
            VITE_BRANCH_MODE: "single",
            VITE_CENTER_ID: "123e4567-e89b-12d3-a456-426614174000" // Valid UUID
        });
        expect(env.centerId).toBe("123e4567-e89b-12d3-a456-426614174000");
    });
});
