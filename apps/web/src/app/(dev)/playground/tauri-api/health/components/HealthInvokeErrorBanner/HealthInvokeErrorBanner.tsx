"use client";

import { useHealthPlaygroundShallowPick } from "../../model";
import styles from "./HealthInvokeErrorBanner.module.scss";

type HealthInvokeErrorBannerProps = Record<string, never>;

export const HealthInvokeErrorBanner = (
  props: HealthInvokeErrorBannerProps,
) => {
  const {} = props;
  const { invokeError } = useHealthPlaygroundShallowPick(["invokeError"]);

  if (!invokeError) {
    return null;
  }

  return (
    <p className={styles.alert} role="alert">
      {invokeError}
    </p>
  );
};
