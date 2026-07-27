"use client";

import type { Window as TauriWindow } from "@tauri-apps/api/window";

export const isTauriRuntime = (): boolean => {
  return (
    typeof window !== "undefined" &&
    ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)
  );
};

let windowModulePromise: Promise<
  typeof import("@tauri-apps/api/window")
> | null = null;

const getWindowModule = () => {
  if (!windowModulePromise)
    windowModulePromise = import("@tauri-apps/api/window");
  return windowModulePromise;
};

let cachedAppWindow: TauriWindow | null = null;

const getAppWindow = async (): Promise<TauriWindow> => {
  const { getCurrentWindow } = await getWindowModule();
  if (!cachedAppWindow) cachedAppWindow = getCurrentWindow();
  return cachedAppWindow;
};

const withCurrentWindow = async (
  action: (appWindow: TauriWindow) => Promise<void>,
): Promise<void> => {
  if (!isTauriRuntime()) return;
  await action(await getAppWindow());
};

export const minimizeCurrentWindow = async (): Promise<void> => {
  return withCurrentWindow((appWindow) => appWindow.minimize());
};

export const toggleMaximizeCurrentWindow = async (): Promise<void> => {
  return withCurrentWindow((appWindow) => appWindow.toggleMaximize());
};

export const closeCurrentWindow = async (): Promise<void> => {
  return withCurrentWindow((appWindow) => appWindow.close());
};
