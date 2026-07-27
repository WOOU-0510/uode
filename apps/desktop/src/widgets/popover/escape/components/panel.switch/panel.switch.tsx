"use client";

import type * as React from "react";
import { Popover } from "@uode/base-ui-react";
import { EscapeMenuPanel, EscapeSettingsPanel } from "../";
import styles from "./panel.switch.module.scss";

/**
 * 전역 ESC로 여는 첫 메뉴 + 설정 서브 패널 UI.
 * Popover.Root 내부에서만 마운트합니다.
 */
type EscapePopoverPanelSwitchProps = Record<string, never>;

export const EscapePopoverPanelSwitch = (
  props: EscapePopoverPanelSwitchProps,
) => {
  const {} = props;
  const controller = Popover.useController();

  let panel: React.ReactNode = null;
  switch (controller.topEntry?.key) {
    case "menu":
      panel = <EscapeMenuPanel controller={controller} />;
      break;
    case "settings":
      panel = <EscapeSettingsPanel controller={controller} />;
      break;
    default:
      panel = null;
      break;
  }

  return <div className={styles.root}>{panel}</div>;
};
