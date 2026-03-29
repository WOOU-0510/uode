import { Button } from "@uode/base-ui-react";
import styles from "./ButtonBasicSection.module.scss";

type ButtonBasicSectionProps = Record<string, never>;

export const ButtonBasicSection = (props: ButtonBasicSectionProps) => {
  const {} = props;

  return (
    <section className={styles.section}>
      <h2>기본</h2>
      <p>
        토글 없이 일반 버튼입니다. 스토어의 <code>disabled</code> /
        <code>pressed</code>는 Root에서만 바뀝니다.
      </p>
      <div className={styles.row}>
        <Button.Root>
          <Button.Trigger>클릭</Button.Trigger>
        </Button.Root>
      </div>
    </section>
  );
};
