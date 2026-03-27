"use client";

import { isTauriRuntime } from "./window";

export type UpdateCheckResult = {
  available: boolean;
  version: string | null;
  body: string | null;
};

type UpdaterModule = typeof import("@tauri-apps/plugin-updater");

let updaterModulePromise: Promise<UpdaterModule> | null = null;

const getUpdaterModule = (): Promise<UpdaterModule> => {
  if (updaterModulePromise === null) {
    updaterModulePromise = import("@tauri-apps/plugin-updater");
  }
  return updaterModulePromise;
};

export const checkForAppUpdate = async (): Promise<UpdateCheckResult> => {
  if (!isTauriRuntime()) {
    return { available: false, version: null, body: null };
  }

  const { check } = await getUpdaterModule();
  const update = await check();
  if (update === null) {
    return { available: false, version: null, body: null };
  }
  return {
    available: true,
    version: update.version,
    body: update.body ?? null,
  };
};

export const downloadAndInstallLatestUpdate = async (): Promise<boolean> => {
  if (!isTauriRuntime()) return false;
  const { check } = await getUpdaterModule();
  const update = await check();
  if (update === null) return false;
  await update.downloadAndInstall();
  return true;
};
