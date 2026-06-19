import { config } from "../config/env";

export const tenantContext = {
  // Reserved for future multi-center mode.
  // Single-branch runtime must use the validated fixed center ID via requireConfiguredCenterId().
  activeCenterId: null as string | null
};

export function requireConfiguredCenterId(): string {
  if (config.branchMode === "single") {
    if (!config.centerId) {
      throw new Error("Single-branch center ID is not configured");
    }
    return config.centerId;
  }
  // If multi, fallback to dynamic
  if (!tenantContext.activeCenterId) {
    throw new Error("Active center is not configured");
  }
  return tenantContext.activeCenterId;
}
