"use client";

import { Button } from "@uode/base-ui-react";
import styles from "./ToggleStateLabel.module.scss";

type ToggleStateLabelProps = Record<string, never>;

export const ToggleStateLabel = (props: ToggleStateLabelProps) => {
  const {} = props;
  const controller = Button.useController();
  return (
    <p className={styles.meta}>
      pressed: {String(controller.pressed)} · disabled:{" "}
      {String(controller.disabled)}
    </p>
  );
};
