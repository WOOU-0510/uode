"use client";

import cn from "classnames";
import {
  closeCurrentWindow,
  minimizeCurrentWindow,
  toggleMaximizeCurrentWindow,
} from "@/shared/lib/tauri";
import styles from "./titlebar.module.scss";

export const TitleBar = () => {
  return (
    <header className={styles.titlebar}>
      <button
        className={styles.drag}
        type="button"
        data-tauri-drag-region
        aria-label="Window title bar"
        onClick={(e) => {
          e.preventDefault();
        }}
        onDoubleClick={() => {
          void toggleMaximizeCurrentWindow();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            void toggleMaximizeCurrentWindow();
          }
        }}
      >
        <span className={styles.title}>uode</span>
      </button>

      <nav className={styles.actions} aria-label="Window controls">
        <button
          className={styles.btn}
          type="button"
          onClick={() => {
            void minimizeCurrentWindow();
          }}
          aria-label="Minimize window"
          title="Minimize"
        >
          —
        </button>
        <button
          className={styles.btn}
          type="button"
          onClick={() => {
            void toggleMaximizeCurrentWindow();
          }}
          aria-label="Toggle maximize window"
          title="Maximize"
        >
          □
        </button>
        <button
          className={cn(styles.btn, styles.btnClose)}
          type="button"
          onClick={() => {
            void closeCurrentWindow();
          }}
          aria-label="Close window"
          title="Close"
        >
          ×
        </button>
      </nav>
    </header>
  );
};
