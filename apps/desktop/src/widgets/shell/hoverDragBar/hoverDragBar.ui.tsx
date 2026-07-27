"use client";

import styles from "./hoverDragBar.module.scss";

type HoverDragBarProps = Record<string, never>;

export const HoverDragBar = (props: HoverDragBarProps) => {
  const {} = props;

  return (
    <div className={styles.hotzone}>
      <button
        className={styles.dragBar}
        type="button"
        data-tauri-drag-region
        aria-label="Move window"
        title="Move window"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <span className={styles.grip} aria-hidden="true" />
      </button>
    </div>
  );
};
