"use client";

import {
  closeCurrentWindow,
  minimizeCurrentWindow,
  toggleMaximizeCurrentWindow,
} from "@/shared/lib/tauri";
import { useWindowPlaygroundShallowPick } from "../../model";
import styles from "./WindowPlaygroundActions.module.scss";

type WindowPlaygroundActionsProps = Record<string, never>;

export const WindowPlaygroundActions = (
  props: WindowPlaygroundActionsProps,
) => {
  const {} = props;
  const { runWindowAction } = useWindowPlaygroundShallowPick([
    "runWindowAction",
  ]);

  return (
    <section className={styles.section}>
      <h2>창 동작</h2>
      <p>최소화, 최대화 토글, 닫기</p>
      <div className={styles.row}>
        <button
          type="button"
          onClick={() => runWindowAction(() => minimizeCurrentWindow())}
        >
          최소화
        </button>
        <button
          type="button"
          onClick={() => runWindowAction(() => toggleMaximizeCurrentWindow())}
        >
          최대화 토글
        </button>
        <button
          type="button"
          onClick={() => runWindowAction(() => closeCurrentWindow())}
        >
          창 닫기
        </button>
      </div>
    </section>
  );
};
