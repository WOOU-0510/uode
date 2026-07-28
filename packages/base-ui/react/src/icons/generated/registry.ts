/* 이 파일은 packages/cli/src/commands/icon/generate.ts에 의해 자동 생성됩니다. 직접 수정하지 마세요. */

import type * as React from "react";

import ArrowRangeIcon from "./arrow_range";
import FolderFilledIcon from "./folder_filled";
import FolderOutlinedIcon from "./folder_outlined";
import FolderRoundIcon from "./folder_round";
import FolderSharpIcon from "./folder_sharp";
import FolderTwotoneIcon from "./folder_twotone";
import ReactIcon from "./react";
import TauriIcon from "./tauri";
import ViteIcon from "./vite";

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export const ICON_NAMES = [
  "arrow_range",
  "folder_filled",
  "folder_outlined",
  "folder_round",
  "folder_sharp",
  "folder_twotone",
  "react",
  "tauri",
  "vite",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export const ICON_REGISTRY = {
  arrow_range: ArrowRangeIcon,
  folder_filled: FolderFilledIcon,
  folder_outlined: FolderOutlinedIcon,
  folder_round: FolderRoundIcon,
  folder_sharp: FolderSharpIcon,
  folder_twotone: FolderTwotoneIcon,
  react: ReactIcon,
  tauri: TauriIcon,
  vite: ViteIcon,
} satisfies Record<IconName, IconComponent>;
