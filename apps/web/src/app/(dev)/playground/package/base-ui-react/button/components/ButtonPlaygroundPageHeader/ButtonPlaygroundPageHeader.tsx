import styles from "./ButtonPlaygroundPageHeader.module.scss";

type ButtonPlaygroundPageHeaderProps = Record<string, never>;

export const ButtonPlaygroundPageHeader = (
  props: ButtonPlaygroundPageHeaderProps,
) => {
  const {} = props;

  return (
    <header className={styles.pageHeader}>
      <h1>package / base-ui-react / button</h1>
      <p>
        <code>@uode/base-ui-react</code>의 Button 컴파운드 API(
        <code>Root</code>, <code>Trigger</code>, <code>useController</code>)
        예시입니다. 코어 스토어는 <code>useSyncExternalStore</code>로
        구독합니다.
      </p>
    </header>
  );
};
