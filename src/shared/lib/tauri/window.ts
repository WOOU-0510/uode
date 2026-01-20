"use client";

function isTauriRuntime(): boolean {
  return (
    typeof window !== "undefined" &&
    ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)
  );
}

async function getAppWindow() {
  const { getCurrentWindow } = await import("@tauri-apps/api/window");
  return getCurrentWindow();
}

export async function minimizeCurrentWindow(): Promise<void> {
  if (!isTauriRuntime()) return;
  await (await getAppWindow()).minimize();
}

export async function toggleMaximizeCurrentWindow(): Promise<void> {
  if (!isTauriRuntime()) return;
  await (await getAppWindow()).toggleMaximize();
}

export async function closeCurrentWindow(): Promise<void> {
  if (!isTauriRuntime()) return;
  await (await getAppWindow()).close();
}
