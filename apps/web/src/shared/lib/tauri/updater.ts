"use client";

import type { Update } from "@tauri-apps/plugin-updater";
import { isTauriRuntime } from "./window";

export type UpdateCheckResult = {
  available: boolean;
  version: string | null;
  body: string | null;
};

type UpdaterModule = typeof import("@tauri-apps/plugin-updater");

const CHECK_TIMEOUT_MS = 45_000;

let updaterModulePromise: Promise<UpdaterModule> | null = null;

const getUpdaterModule = (): Promise<UpdaterModule> => {
  if (updaterModulePromise === null) {
    updaterModulePromise = import("@tauri-apps/plugin-updater");
  }
  return updaterModulePromise;
};

const stripLeadingV = (v: string): string => v.trim().replace(/^v/i, "");

const semverCoreParts = (v: string): number[] => {
  const core = stripLeadingV(v).split(/[-+]/)[0] ?? "";
  return core.split(".").map((p) => {
    const n = Number.parseInt(p, 10);
    return Number.isFinite(n) ? n : 0;
  });
};

function compareSemverCore(remote: string, current: string): number {
  const a = semverCoreParts(remote);
  const b = semverCoreParts(current);
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const da = a[i] ?? 0;
    const db = b[i] ?? 0;
    if (da !== db) return da - db;
  }
  return 0;
}

function prereleaseTail(v: string): string | null {
  const s = stripLeadingV(v);
  const idx = s.indexOf("-");
  if (idx === -1) return null;
  return s.slice(idx + 1);
}

/** 서버/플러그인이 동일·구버전을 새 버전처럼 줄 때 오탐 방지 */
function isRemoteNewer(remote: string, current: string): boolean {
  const coreCmp = compareSemverCore(remote, current);
  if (coreCmp > 0) return true;
  if (coreCmp < 0) return false;

  const rTail = prereleaseTail(remote);
  const cTail = prereleaseTail(current);
  if (rTail === null && cTail === null) return false;
  if (rTail === null && cTail !== null) return true;
  if (rTail !== null && cTail === null) return false;
  if (rTail === cTail) return false;
  return rTail !== null && cTail !== null && rTail.localeCompare(cTail) > 0;
}

async function getAvailableUpdate(): Promise<Update | null> {
  const { check } = await getUpdaterModule();
  const update = await check({ timeout: CHECK_TIMEOUT_MS });
  if (update === null) return null;

  const remote = update.version.trim();
  const current = update.currentVersion.trim();
  if (remote === "" || current === "") {
    await update.close().catch(() => {});
    return null;
  }

  if (!isRemoteNewer(remote, current)) {
    await update.close().catch(() => {});
    return null;
  }

  return update;
}

export const checkForAppUpdate = async (): Promise<UpdateCheckResult> => {
  if (!isTauriRuntime()) {
    return { available: false, version: null, body: null };
  }

  const update = await getAvailableUpdate();
  if (update === null) {
    return { available: false, version: null, body: null };
  }

  const result: UpdateCheckResult = {
    available: true,
    version: update.version,
    body: update.body ?? null,
  };
  await update.close().catch(() => {});
  return result;
};

export const downloadAndInstallLatestUpdate = async (): Promise<boolean> => {
  if (!isTauriRuntime()) return false;
  const update = await getAvailableUpdate();
  if (update === null) return false;
  await update.downloadAndInstall();
  return true;
};
