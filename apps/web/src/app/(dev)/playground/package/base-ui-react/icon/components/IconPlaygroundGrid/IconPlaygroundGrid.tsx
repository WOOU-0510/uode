"use client";

import { Icon, ICON_NAMES } from "@uode/base-ui-react";
import { useIconPlaygroundShallowPick } from "../../model";
import styles from "./IconPlaygroundGrid.module.scss";

type IconPlaygroundGridProps = Record<string, never>;

export const IconPlaygroundGrid = (props: IconPlaygroundGridProps) => {
  const {} = props;
  const { settings, updateIcon } = useIconPlaygroundShallowPick([
    "settings",
    "updateIcon",
  ]);

  return (
    <div className={styles.iconGrid}>
      {ICON_NAMES.map((name) => {
        const s = settings[name];
        return (
          <article key={name} className={styles.iconCard}>
            <p className={styles.iconName}>{name}</p>
            <div className={styles.iconPreview}>
              <Icon
                name={name}
                style={{
                  width: s.sizePx,
                  height: s.sizePx,
                  color: s.color,
                }}
              />
            </div>
            <div className={styles.fieldRow}>
              <label htmlFor={`icon-color-${name}`}>색</label>
              <input
                id={`icon-color-${name}`}
                type="color"
                value={s.color}
                onChange={(e) =>
                  updateIcon(name, { color: e.currentTarget.value })
                }
              />
            </div>
            <div className={styles.fieldRow}>
              <label htmlFor={`icon-size-${name}`}>크기 {s.sizePx}px</label>
              <input
                id={`icon-size-${name}`}
                type="range"
                min={16}
                max={128}
                step={1}
                value={s.sizePx}
                onChange={(e) => {
                  const next = Number(e.currentTarget.value);
                  if (Number.isNaN(next)) return;
                  updateIcon(name, { sizePx: next });
                }}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
};
