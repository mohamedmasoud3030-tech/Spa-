import { describe, it, expect } from "vitest";
import { EnvironmentConfigurationError, parseEnv } from "../config/env";

describe("Removed Preview Mode workflows", () => {
  it("blocks VITE_DATA_BACKEND=preview before use cases are created", () => {
    expect(() => parseEnv({ VITE_DATA_BACKEND: "preview" }))
      .toThrowError(EnvironmentConfigurationError);
  });

  it("blocks missing backend configuration instead of creating mock workflows", () => {
    expect(() => parseEnv({}))
      .toThrowError(EnvironmentConfigurationError);
  });
});
