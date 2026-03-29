import { Button } from "@uode/base-ui-react";
import { ToggleStateLabel } from "../ToggleStateLabel";
import styles from "./ButtonToggleSection.module.scss";

type ButtonToggleSectionProps = Record<string, never>;

export const ButtonToggleSection = (props: ButtonToggleSectionProps) => {
  const {} = props;

  return (
    <section className={styles.section}>
      <h2>토글 (aria-pressed)</h2>
      <p>
        <code>Trigger</code>에 <code>toggle</code>를 주면 클릭 시{" "}
        <code>togglePressed</code>가 호출됩니다.
      </p>
      <Button.Root>
        <div className={styles.row}>
          <ToggleStateLabel />
          <Button.Trigger toggle>토글</Button.Trigger>
        </div>
      </Button.Root>
    </section>
  );
};
