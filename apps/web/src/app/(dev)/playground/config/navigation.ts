/**
 * 이 라우트(`app/(dev)/playground`)의 사이드바 내비와 동일한 트리.
 * (route group `(dev)`는 URL에 포함되지 않음)
 */

import type { Route } from "next";

/**
 * Next `Route`는 `RouteImpl`이 전체 StaticRoutes를 항상 유니온에 넣어 `/test` 등이 섞입니다.
 * 플레이그라운드 경로는 모두 `/playground` 접두사이므로 typegen `Route`와 교집합만 취합니다.
 */
export type PlaygroundNavHref = Extract<Route, `/playground${string}`>;

export type PlaygroundNavLink = {
  kind: "link";
  href: PlaygroundNavHref;
  /** 세그먼트·파일명과 맞춘 표시용 라벨 */
  label: string;
};

export type PlaygroundNavGroup = {
  kind: "group";
  /** `playground/` 아래 폴더명과 동일 */
  segment: "lib" | "tauri-api" | "package" | "base-ui-react";
  items: readonly PlaygroundNavEntry[];
};

export type PlaygroundNavEntry = PlaygroundNavLink | PlaygroundNavGroup;

export const NAV_ENTRIES: readonly PlaygroundNavEntry[] = [
  { kind: "link", href: "/playground", label: "page" },
  {
    kind: "group",
    segment: "lib",
    items: [{ kind: "link", href: "/playground/lib/icon", label: "icon" }],
  },
  {
    kind: "group",
    segment: "tauri-api",
    items: [
      { kind: "link", href: "/playground/tauri-api/window", label: "window" },
      { kind: "link", href: "/playground/tauri-api/health", label: "health" },
    ],
  },
  {
    kind: "group",
    segment: "package",
    items: [
      {
        kind: "group",
        segment: "base-ui-react",
        items: [
          {
            kind: "link",
            href: "/playground/package/base-ui-react/popover",
            label: "popover",
          },
        ],
      },
    ],
  },
];
