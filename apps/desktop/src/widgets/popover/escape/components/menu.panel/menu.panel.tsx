"use client";

import * as React from "react";
import type { Popover } from "@uode/base-ui-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { closeCurrentWindow } from "@/shared/lib/tauri";
import styles from "./menu.panel.module.scss";

type EscapeMenuPanelProps = {
  controller: Popover.Controller;
};

export const EscapeMenuPanel = (props: EscapeMenuPanelProps) => {
  const { controller } = props;
  const pathname = usePathname() ?? "/";
  const isPlaygroundNavigationRequestedRef = React.useRef(false);

  React.useEffect(() => {
    if (!isPlaygroundNavigationRequestedRef.current) return;
    if (!pathname.startsWith("/playground")) return;
    controller.closeTopPanel();
    isPlaygroundNavigationRequestedRef.current = false;
  }, [controller, pathname]);

  return (
    <>
      <h2 className={styles.title}>메뉴</h2>
      <p className={styles.sub}>Esc로 닫거나, 아래에서 이동할 수 있어요.</p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            controller.openPanel("settings", {}, { mode: "replace" })
          }
        >
          설정
        </button>
        <Link
          className={styles.button}
          href="/playground"
          onNavigate={() => {
            isPlaygroundNavigationRequestedRef.current = true;
          }}
        >
          플레이그라운드
        </Link>
        <button
          type="button"
          className={styles.button}
          onClick={() => controller.closeTopPanel()}
        >
          닫기
        </button>
        <button
          type="button"
          className={styles.buttonDanger}
          onClick={() => void closeCurrentWindow()}
        >
          앱 종료
        </button>
      </div>
    </>
  );
};
