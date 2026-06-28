import { invokeDesktop } from './bridge';

export interface DesktopDatabaseHealth {
  connected: boolean;
  path: string;
  sqliteReady: boolean;
}

export interface DesktopSnapshotSummary {
  filePath: string;
  exportedAtISO: string;
  bytes: number;
}

export interface DesktopPrintPayload {
  title: string;
  html: string;
}

export async function getDesktopDatabaseHealth(): Promise<DesktopDatabaseHealth> {
  return invokeDesktop<DesktopDatabaseHealth>('desktop_db_health');
}

export async function exportDesktopBackup(pretty = true): Promise<DesktopSnapshotSummary> {
  return invokeDesktop<DesktopSnapshotSummary>('desktop_export_backup', { pretty });
}

export async function importDesktopBackup(filePath: string): Promise<{ restored: boolean; importedAtISO: string }> {
  return invokeDesktop<{ restored: boolean; importedAtISO: string }>('desktop_import_backup', { filePath });
}

export async function printDesktopHtml(payload: DesktopPrintPayload): Promise<{ queued: boolean }> {
  return invokeDesktop<{ queued: boolean }>('desktop_print_html', { title: payload.title, html: payload.html });
}
