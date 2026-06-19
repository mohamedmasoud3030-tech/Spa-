import { describe, it, expect, vi } from "vitest";

// Mock env.ts so that tests testing the generic behavior aren't polluted by actual system env vars
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

import { parseEnv, EnvironmentConfigurationError } from "../config/env";
import { createRepositoryBundle, InfrastructureError } from "../infrastructure/createRepositoryBundle";

describe("Substrate Configuration Tests", () => {
  it("resolves to preview when backend env missing", () => {
    const env = parseEnv({ VITE_BRANCH_MODE: "multi" });
    expect(env.backend).toBe("preview");
    expect(env.previewModeEnabled).toBe(true);
  });

  it("resolves to preview when VITE_DATA_BACKEND=preview", () => {
    const env = parseEnv({ VITE_DATA_BACKEND: "preview", VITE_BRANCH_MODE: "multi" });
    expect(env.backend).toBe("preview");
  });

  it("fails clearly with unknown backend value", () => {
    expect(() => parseEnv({ VITE_DATA_BACKEND: "firebase", VITE_BRANCH_MODE: "multi" }))
      .toThrowError(EnvironmentConfigurationError);
  });

  it("is valid in preview mode without Supabase values", () => {
    const env = parseEnv({ VITE_DATA_BACKEND: "preview", VITE_BRANCH_MODE: "multi" });
    expect(env.supabaseUrl).toBeUndefined();
    expect(env.supabasePublishableKey).toBeUndefined();
  });

  it("fails in supabase mode without URL", () => {
    expect(() => parseEnv({ VITE_DATA_BACKEND: "supabase", VITE_SUPABASE_PUBLISHABLE_KEY: "anon-key", VITE_BRANCH_MODE: "multi" }))
      .toThrowError(EnvironmentConfigurationError);
  });

  it("fails in supabase mode without publishable key", () => {
    expect(() => parseEnv({ VITE_DATA_BACKEND: "supabase", VITE_SUPABASE_URL: "https://test.supabase.co", VITE_BRANCH_MODE: "multi" }))
      .toThrowError(EnvironmentConfigurationError);
  });

  it("fails in supabase mode with malformed URL", () => {
    expect(() => parseEnv({ 
      VITE_DATA_BACKEND: "supabase", 
      VITE_SUPABASE_URL: "not-a-valid-url",
      VITE_SUPABASE_PUBLISHABLE_KEY: "anon-key",
      VITE_BRANCH_MODE: "multi"
    })).toThrowError(EnvironmentConfigurationError);
  });

  it("treats blank string as missing", () => {
    expect(() => parseEnv({ 
      VITE_DATA_BACKEND: "supabase", 
      VITE_SUPABASE_URL: "https://test.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: "   ",
      VITE_BRANCH_MODE: "multi"
    })).toThrowError(EnvironmentConfigurationError);
  });

  it("rejects values starting with sb_secret_", () => {
    expect(() => parseEnv({ 
      VITE_DATA_BACKEND: "supabase", 
      VITE_SUPABASE_URL: "https://test.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: "sb_secret_something",
      VITE_BRANCH_MODE: "multi"
    })).toThrowError(EnvironmentConfigurationError);
  });
  
  it("resolves preview backend to a deterministic mock center ID without needing env", () => {
    const env = parseEnv({ VITE_DATA_BACKEND: "preview", VITE_BRANCH_MODE: "single" });
    expect(env.backend).toBe("preview");
    expect(env.centerId).toBe("00000000-0000-4000-8000-000000000001");
  });

  it("fails in supabase single mode without real VITE_CENTER_ID", () => {
    expect(() => parseEnv({ 
      VITE_DATA_BACKEND: "supabase", 
      VITE_SUPABASE_URL: "https://test.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: "anon-key",
      VITE_BRANCH_MODE: "single",
      VITE_CENTER_ID: ""
    })).toThrowError(EnvironmentConfigurationError);
  });

  it("fails in supabase single mode with invalid VITE_CENTER_ID", () => {
    expect(() => parseEnv({ 
      VITE_DATA_BACKEND: "supabase", 
      VITE_SUPABASE_URL: "https://test.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: "anon-key",
      VITE_BRANCH_MODE: "single",
      VITE_CENTER_ID: "not-a-uuid"
    })).toThrowError(EnvironmentConfigurationError);
  });
});

import { getSupabaseClient } from "../infrastructure/supabase/client";

describe("Preview-Safe Repository Factory Tests", () => {
  it("returns existing Preview behavior by default", () => {
    const bundle = createRepositoryBundle();
    expect(bundle.authAdapter).toBeDefined();
    expect(bundle.authAdapter.constructor.name).toBe("PreviewAuthAdapter");
  });

  it("throws when accessing Supabase client in preview mode", () => {
    expect(() => getSupabaseClient()).toThrowError(/outside of supabase mode/);
  });
});