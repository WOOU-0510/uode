/* 이 파일은 scripts/svgr-generate-icons.ts에 의해 자동 생성됩니다. 직접 수정하지 마세요. */

import * as React from "react";

import ArrowRangeIcon from "./arrow_range";
import ReactIcon from "./react";
import TauriIcon from "./tauri";
import ViteIcon from "./vite";

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export const ICON_NAMES = [
  "arrow_range",
  "react",
  "tauri",
  "vite",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export const ICON_REGISTRY = {
  arrow_range: ArrowRangeIcon,
  react: ReactIcon,
  tauri: TauriIcon,
  vite: ViteIcon,
} satisfies Record<IconName, IconComponent>;
