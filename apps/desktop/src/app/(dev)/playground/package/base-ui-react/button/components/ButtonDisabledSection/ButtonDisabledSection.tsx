"use client";

import * as React from "react";
import { Button } from "@uode/base-ui-react";
import styles from "./ButtonDisabledSection.module.scss";

type ButtonDisabledSectionProps = Record<string, never>;

export const ButtonDisabledSection = (props: ButtonDisabledSectionProps) => {
  const {} = props;
  const [rootDisabled, setRootDisabled] = React.useState(false);

  return (
    <section className={styles.section}>
      <h2>Root 제어 disabled</h2>
      <p>
        <code>Button.Root disabled=&#123;…&#125;</code>로 스토어와 동기화할 수
        있습니다.
      </p>
      <Button.Root disabled={rootDisabled}>
        <div className={styles.row}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={rootDisabled}
              onChange={(event) => {
                setRootDisabled(event.target.checked);
              }}
            />
            Root disabled
          </label>
          <Button.Trigger>트리거</Button.Trigger>
        </div>
      </Button.Root>
    </section>
  );
};
