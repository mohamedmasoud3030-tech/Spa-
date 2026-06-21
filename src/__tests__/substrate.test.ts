import { describe, it, expect, vi } from "vitest";

vi.mock("../config/env", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../config/env")>();
  return {
    ...actual,
    config: {
      backend: "supabase",
      branchMode: "single",
      centerId: "123e4567-e89b-12d3-a456-426614174000",
      supabaseUrl: "https://test.supabase.co",
      supabasePublishableKey: "anon-key",
    }
  };
});

import { parseEnv, EnvironmentConfigurationError } from "../config/env";
import { createRepositoryBundle } from "../infrastructure/createRepositoryBundle";

describe("Substrate Configuration Tests", () => {
  it("fails when backend env is missing", () => {
    expect(() => parseEnv({})).toThrowError(EnvironmentConfigurationError);
  });

  it("fails when VITE_DATA_BACKEND=preview", () => {
    expect(() => parseEnv({ VITE_DATA_BACKEND: "preview" }))
      .toThrowError(EnvironmentConfigurationError);
  });

  it("fails clearly with unknown backend value", () => {
    expect(() => parseEnv({ VITE_DATA_BACKEND: "firebase" }))
      .toThrowError(EnvironmentConfigurationError);
  });

  it("fails in supabase mode without URL", () => {
    expect(() => parseEnv({
      VITE_DATA_BACKEND: "supabase",
      VITE_SUPABASE_PUBLISHABLE_KEY: "anon-key",
      VITE_BRANCH_MODE: "single",
      VITE_CENTER_ID: "123e4567-e89b-12d3-a456-426614174000",
    })).toThrowError(EnvironmentConfigurationError);
  });

  it("fails in supabase mode without publishable key", () => {
    expect(() => parseEnv({
      VITE_DATA_BACKEND: "supabase",
      VITE_SUPABASE_URL: "https://test.supabase.co",
      VITE_BRANCH_MODE: "single",
      VITE_CENTER_ID: "123e4567-e89b-12d3-a456-426614174000",
    })).toThrowError(EnvironmentConfigurationError);
  });

  it("fails in supabase mode with malformed URL", () => {
    expect(() => parseEnv({
      VITE_DATA_BACKEND: "supabase",
      VITE_SUPABASE_URL: "not-a-valid-url",
      VITE_SUPABASE_PUBLISHABLE_KEY: "anon-key",
      VITE_BRANCH_MODE: "single",
      VITE_CENTER_ID: "123e4567-e89b-12d3-a456-426614174000",
    })).toThrowError(EnvironmentConfigurationError);
  });

  it("treats blank publishable key as missing", () => {
    expect(() => parseEnv({
      VITE_DATA_BACKEND: "supabase",
      VITE_SUPABASE_URL: "https://test.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: "   ",
      VITE_BRANCH_MODE: "single",
      VITE_CENTER_ID: "123e4567-e89b-12d3-a456-426614174000",
    })).toThrowError(EnvironmentConfigurationError);
  });

  it("rejects values starting with sb_secret_", () => {
    expect(() => parseEnv({
      VITE_DATA_BACKEND: "supabase",
      VITE_SUPABASE_URL: "https://test.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: "sb_secret_something",
      VITE_BRANCH_MODE: "single",
      VITE_CENTER_ID: "123e4567-e89b-12d3-a456-426614174000",
    })).toThrowError(EnvironmentConfigurationError);
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

  it("returns Supabase repository adapters", () => {
    const bundle = createRepositoryBundle();
    expect(bundle.authAdapter.constructor.name).toBe("SupabaseAuthAdapter");
  });
});
