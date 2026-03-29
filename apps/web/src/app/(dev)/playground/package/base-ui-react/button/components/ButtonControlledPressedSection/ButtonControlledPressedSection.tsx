"use client";

import * as React from "react";
import { Button } from "@uode/base-ui-react";
import styles from "./ButtonControlledPressedSection.module.scss";

type ButtonControlledPressedSectionProps = Record<string, never>;

export const ButtonControlledPressedSection = (
  props: ButtonControlledPressedSectionProps,
) => {
  const {} = props;
  const [pressed, setPressed] = React.useState(false);

  return (
    <section className={styles.section}>
      <h2>Root 제어 pressed</h2>
      <p>
        외부 상태로 <code>pressed</code>만 제어하는 예시입니다. (
        <code>Trigger</code>에는 <code>toggle</code>를 쓰지 않습니다.)
      </p>
      <Button.Root pressed={pressed}>
        <div className={styles.row}>
          <p className={styles.meta}>pressed (상위 state): {String(pressed)}</p>
          <Button.Trigger>표시용 트리거</Button.Trigger>
        </div>
      </Button.Root>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setPressed(true);
          }}
        >
          pressed → true
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setPressed(false);
          }}
        >
          pressed → false
        </button>
      </div>
    </section>
  );
};
