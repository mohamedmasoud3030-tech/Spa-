import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config, EnvironmentConfigurationError } from "../../config/env";

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (config.backend !== "supabase") {
    throw new EnvironmentConfigurationError("Attempted to construct Supabase client outside of supabase mode.");
  }

  if (!config.supabaseUrl || !config.supabasePublishableKey) {
     throw new EnvironmentConfigurationError("Supabase credentials missing.");
  }

  supabaseClient = createClient(config.supabaseUrl, config.supabasePublishableKey);
  return supabaseClient;
}
