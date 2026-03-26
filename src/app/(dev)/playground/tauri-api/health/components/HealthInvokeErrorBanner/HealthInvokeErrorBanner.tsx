"use client";

import { useHealthPlaygroundShallowPick } from "../../model";
import styles from "./HealthInvokeErrorBanner.module.scss";

export function HealthInvokeErrorBanner() {
  const { invokeError } = useHealthPlaygroundShallowPick(["invokeError"]);

  if (!invokeError) {
    return null;
  }

  return (
    <p className={styles.alert} role="alert">
      {invokeError}
    </p>
  );
}
