import type { ReactNode } from "react";
import { PlaygroundSidebar } from "../PlaygroundSidebar";
import styles from "./PlaygroundShell.module.scss";

type PlaygroundShellProps = {
  children: ReactNode;
};

export function PlaygroundShell(props: PlaygroundShellProps) {
  const { children } = props;

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Playground 내비게이션">
        <PlaygroundSidebar />
      </aside>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
