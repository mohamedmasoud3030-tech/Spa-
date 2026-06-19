import { DomainError, AuthError } from "../../domain/ports/repositories";

export class SupabaseInfrastructureError extends Error implements DomainError {
  code: "INFRASTRUCTURE_ERROR" = "INFRASTRUCTURE_ERROR";
  constructor(message: string, public type: string) {
    super(message);
    this.name = "SupabaseInfrastructureError";
  }
}

export class UnsupportedBackendMethodError extends Error implements DomainError {
  code: "BACKEND_METHOD_UNSUPPORTED" = "BACKEND_METHOD_UNSUPPORTED";
  constructor(methodName: string) {
    super(`Method ${methodName} is not yet supported in the Supabase backend.`);
    this.name = "UnsupportedBackendMethodError";
  }
}

export function createUnsupportedWriteError(method: string): DomainError {
  return new UnsupportedBackendMethodError(method);
}

export function createUnsupportedReadError(method: string): DomainError {
  return new UnsupportedBackendMethodError(method);
}

export function createMappingError(method: string, details: string): DomainError {
  return new SupabaseInfrastructureError(`Row mapping failed in [${method}]: ${details}`, "SUPABASE_MAPPING_ERROR");
}

export function createQueryError(method: string, details: string): DomainError {
  return new SupabaseInfrastructureError(`Query failed in [${method}]: ${details}`, "SUPABASE_QUERY_ERROR");
}

export function createUnsupportedAuthError(method: string): AuthError {
    const err = new Error(`Auth path not implemented for [${method}].`) as AuthError;
    err.code = "AUTH_NOT_CONFIGURED";
    return err;
}
