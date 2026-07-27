import type { PlaygroundNavHref } from "./navigation";

export const normalizePlaygroundPath = (path: string): string => {
  const trimmed = path.replace(/\/$/, "");
  return trimmed === "" ? "/" : trimmed;
};

export const isPlaygroundNavActive = (
  pathname: string,
  href: PlaygroundNavHref,
): boolean => {
  const current = normalizePlaygroundPath(pathname);
  const target = normalizePlaygroundPath(href);
  if (target === "/playground") {
    return current === "/playground";
  }
  return current === target || current.startsWith(`${target}/`);
};
