"use client";

import { useWindowPlaygroundShallowPick } from "../../model";
import styles from "./WindowPlaygroundErrorBanner.module.scss";

type WindowPlaygroundErrorBannerProps = Record<string, never>;

export const WindowPlaygroundErrorBanner = (
  props: WindowPlaygroundErrorBannerProps,
) => {
  const {} = props;
  const { error } = useWindowPlaygroundShallowPick(["error"]);

  if (!error) {
    return null;
  }

  return (
    <p className={styles.alert} role="alert">
      {error}
    </p>
  );
};
