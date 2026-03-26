"use client";

import { useWindowPlaygroundShallowPick } from "../../model";
import styles from "./WindowPlaygroundErrorBanner.module.scss";

export function WindowPlaygroundErrorBanner() {
  const { error } = useWindowPlaygroundShallowPick(["error"]);

  if (!error) {
    return null;
  }

  return (
    <p className={styles.alert} role="alert">
      {error}
    </p>
  );
}
