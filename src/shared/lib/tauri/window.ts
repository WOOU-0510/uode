"use client";

import type { Window as TauriWindow } from "@tauri-apps/api/window";

export function isTauriRuntime(): boolean {
  return (
    typeof window !== "undefined" &&
    ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)
  );
}

let windowModulePromise: Promise<
  typeof import("@tauri-apps/api/window")
> | null = null;

function getWindowModule() {
  if (!windowModulePromise)
    windowModulePromise = import("@tauri-apps/api/window");
  return windowModulePromise;
}

let cachedAppWindow: TauriWindow | null = null;

async function getAppWindow(): Promise<TauriWindow> {
  const { getCurrentWindow } = await getWindowModule();
  if (!cachedAppWindow) cachedAppWindow = getCurrentWindow();
  return cachedAppWindow;
}

async function withCurrentWindow(
  action: (appWindow: TauriWindow) => Promise<void>
): Promise<void> {
  if (!isTauriRuntime()) return;
  await action(await getAppWindow());
}

export async function minimizeCurrentWindow(): Promise<void> {
  return withCurrentWindow((appWindow) => appWindow.minimize());
}

export async function toggleMaximizeCurrentWindow(): Promise<void> {
  return withCurrentWindow((appWindow) => appWindow.toggleMaximize());
}

export async function closeCurrentWindow(): Promise<void> {
  return withCurrentWindow((appWindow) => appWindow.close());
}
