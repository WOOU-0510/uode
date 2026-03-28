"use client";

import type * as React from "react";
import cn from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/shared/lib/icons";
import { PlaygroundSidebar } from "../PlaygroundSidebar";
import styles from "./PlaygroundShell.module.scss";

/** 접힘 시 보이는 최소 세로 스트립(내비는 숨김) */
const SIDEBAR_STRIP_MIN_PX = 12;
/** 이 너비 이상일 때만 LNB 표시. 줄이는 드래그·키로 이 아래로 가면 곧바로 스트립(12px)으로 스냅해 LNB와 동기 */
const SIDEBAR_NAV_VISIBLE_MIN_PX = 200;
const SIDEBAR_WIDTH_DEFAULT_PX = 248;
/** 절대 상한(px). 실제 최대는 뷰포트 비율·본문 확보량과 함께 계산 */
const SIDEBAR_MAX_ABS_PX = 400;
/** 뷰포트 대비 사이드바 최대 비율 */
const SIDEBAR_MAX_VW_FRACTION = 0.42;
/** 본문·구터를 위해 남기는 최소 가로 공간(px) */
const MAIN_MIN_RESERVE_PX = 280;
/** 접힘 상태에서 구터를 이 거리(px) 이상 오른쪽으로 끌면 한 번에 펼침 */
const OPEN_SNAP_DRAG_DELTA_PX = 24;
/** 클릭(미세 이동)으로 간주할 최대 이동 거리(px) */
const POINTER_CLICK_MOVE_THRESHOLD_PX = 6;

function getSidebarMaxPx(): number {
  if (typeof window === "undefined") {
    return SIDEBAR_MAX_ABS_PX;
  }
  const w = window.innerWidth;
  const byFraction = Math.floor(w * SIDEBAR_MAX_VW_FRACTION);
  const byMainReserve = Math.max(SIDEBAR_STRIP_MIN_PX, w - MAIN_MIN_RESERVE_PX);
  return Math.min(SIDEBAR_MAX_ABS_PX, byFraction, byMainReserve);
}

type PlaygroundShellProps = {
  children: React.ReactNode;
};

export const PlaygroundShell = (props: PlaygroundShellProps) => {
  const { children } = props;
  const [sidebarWidthPx, setSidebarWidthPx] = useState(SIDEBAR_WIDTH_DEFAULT_PX);
  const [sidebarMaxPx, setSidebarMaxPx] = useState(SIDEBAR_MAX_ABS_PX);
  const gutterRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startWidth: number } | null>(
    null,
  );
  const pointerMovedRef = useRef(false);
  const lastOpenWidthRef = useRef(SIDEBAR_WIDTH_DEFAULT_PX);

  const clampWidth = useCallback((value: number) => {
    const maxPx = getSidebarMaxPx();
    return Math.min(maxPx, Math.max(SIDEBAR_STRIP_MIN_PX, value));
  }, []);

  useEffect(() => {
    const syncLayout = () => {
      setSidebarMaxPx(getSidebarMaxPx());
      setSidebarWidthPx((w) => clampWidth(w));
    };
    syncLayout();
    window.addEventListener("resize", syncLayout);
    return () => window.removeEventListener("resize", syncLayout);
  }, [clampWidth]);

  useEffect(() => {
    if (sidebarWidthPx >= SIDEBAR_NAV_VISIBLE_MIN_PX) {
      lastOpenWidthRef.current = sidebarWidthPx;
    }
  }, [sidebarWidthPx]);

  const applyDragWidth = useCallback(
    (startWidth: number, deltaX: number) => {
      const maxPx = getSidebarMaxPx();
      const raw = startWidth + deltaX;

      if (startWidth < SIDEBAR_NAV_VISIBLE_MIN_PX) {
        if (deltaX <= 0) {
          return SIDEBAR_STRIP_MIN_PX;
        }
        if (deltaX >= OPEN_SNAP_DRAG_DELTA_PX) {
          return clampWidth(lastOpenWidthRef.current);
        }
        return SIDEBAR_STRIP_MIN_PX;
      }

      const next = Math.min(maxPx, Math.max(SIDEBAR_STRIP_MIN_PX, raw));
      if (next < SIDEBAR_NAV_VISIBLE_MIN_PX && next < startWidth) {
        return SIDEBAR_STRIP_MIN_PX;
      }
      return Math.min(maxPx, Math.max(SIDEBAR_NAV_VISIBLE_MIN_PX, next));
    },
    [clampWidth],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }
      if (Math.abs(event.clientX - drag.startX) > POINTER_CLICK_MOVE_THRESHOLD_PX) {
        pointerMovedRef.current = true;
      }
      const delta = event.clientX - drag.startX;
      setSidebarWidthPx(applyDragWidth(drag.startWidth, delta));
    },
    [applyDragWidth],
  );

  const endDrag = useCallback(
    (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }
      dragRef.current = null;
      const el = gutterRef.current;
      if (el?.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }

      const moved = pointerMovedRef.current;
      pointerMovedRef.current = false;

      if (!moved) {
        setSidebarWidthPx((w) => {
          if (w >= SIDEBAR_NAV_VISIBLE_MIN_PX) {
            return SIDEBAR_STRIP_MIN_PX;
          }
          return clampWidth(lastOpenWidthRef.current);
        });
        return;
      }

      setSidebarWidthPx((w) => {
        if (w > SIDEBAR_STRIP_MIN_PX && w < SIDEBAR_NAV_VISIBLE_MIN_PX) {
          return SIDEBAR_STRIP_MIN_PX;
        }
        return w;
      });
    },
    [clampWidth],
  );

  useEffect(() => {
    const move = (e: PointerEvent) => onPointerMove(e);
    const up = (e: PointerEvent) => endDrag(e);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [endDrag, onPointerMove]);

  const onGutterPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    pointerMovedRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startWidth: sidebarWidthPx,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onGutterKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSidebarWidthPx((w) => {
        const next = w - 16;
        if (next < SIDEBAR_NAV_VISIBLE_MIN_PX) {
          return SIDEBAR_STRIP_MIN_PX;
        }
        return clampWidth(next);
      });
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setSidebarWidthPx((w) => {
        if (w < SIDEBAR_NAV_VISIBLE_MIN_PX) {
          return clampWidth(lastOpenWidthRef.current);
        }
        return clampWidth(w + 16);
      });
    }
  };

  const navVisible = sidebarWidthPx >= SIDEBAR_NAV_VISIBLE_MIN_PX;
  const toggleHint = navVisible ? "클릭하면 접습니다." : "클릭하면 펼칩니다.";
  const widthHint = navVisible
    ? `현재 ${Math.round(sidebarWidthPx)}픽셀(최대 약 ${sidebarMaxPx}px). ${toggleHint}`
    : `접힘(스트립만 표시). ${toggleHint} 오른쪽으로 ${OPEN_SNAP_DRAG_DELTA_PX}px 이상 끌면 펼쳐집니다. 펼친 뒤에는 너비를 조절할 수 있습니다.`;

  return (
    <div className={styles.shell}>
      <aside
        className={cn(styles.sidebar, !navVisible ? styles.sidebarStripOnly : null)}
        style={{ flexBasis: sidebarWidthPx, width: sidebarWidthPx }}
        aria-label={navVisible ? "Playground 내비게이션" : "Playground 사이드 스트립(내비 접힘)"}
      >
        {navVisible ? <PlaygroundSidebar /> : null}
      </aside>
      <button
        ref={gutterRef}
        type="button"
        className={styles.resizeGutter}
        aria-expanded={navVisible}
        aria-label={`사이드바 ${navVisible ? "접기" : "펼치기"}·너비 조절. ${widthHint} 좌우 화살표로 16픽셀씩 변경.`}
        onPointerDown={onGutterPointerDown}
        onKeyDown={onGutterKeyDown}
      >
        <span className={styles.resizeGutterLine} aria-hidden />
        <span className={styles.resizeHandle} aria-hidden>
          <span className={styles.resizeHandleCircle}>
            <Icon
              name="arrow_range"
              className={styles.resizeHandleIcon}
              style={{ width: 18, height: 18 }}
            />
          </span>
        </span>
      </button>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
