import { Button } from "@uode/base-ui-react";
import styles from "./ButtonTriggerDisabledSection.module.scss";

type ButtonTriggerDisabledSectionProps = Record<string, never>;

export const ButtonTriggerDisabledSection = (
  props: ButtonTriggerDisabledSectionProps,
) => {
  const {} = props;

  return (
    <section className={styles.section}>
      <h2>Trigger native disabled</h2>
      <p>
        <code>Trigger</code>에 <code>disabled</code>를 주면 스토어{" "}
        <code>disabled</code>와 합쳐집니다(OR).
      </p>
      <div className={styles.row}>
        <Button.Root>
          <Button.Trigger disabled>Trigger만 disabled</Button.Trigger>
        </Button.Root>
      </div>
    </section>
  );
};
