"use client";

import { Button } from "@uode/base-ui-react";
import styles from "./ButtonControlledPressedSection.module.scss";

type ButtonControlledPressedSectionProps = Record<string, never>;

export const ButtonControlledPressedSection = (
  props: ButtonControlledPressedSectionProps,
) => {
  const {} = props;
  const state = Button.useState();

  return (
    <section className={styles.section}>
      <h2>외부 상태 hook 주입</h2>
      <p>
        <code>Button.useState</code>가 core store를 구독하고, 그 상태와 setter를
        Root의 controlled props로 주입합니다.
      </p>
      <Button.Root
        disabled={state.disabled}
        pressed={state.pressed}
        onPressedChange={state.setPressed}
      >
        <div className={styles.row}>
          <p className={styles.meta}>
            pressed: {String(state.pressed)} · disabled:{" "}
            {String(state.disabled)}
          </p>
          <Button.Trigger toggle>제어 토글</Button.Trigger>
          <button
            type="button"
            onClick={() => state.setDisabled(!state.disabled)}
          >
            disabled 전환
          </button>
        </div>
      </Button.Root>
    </section>
  );
};
