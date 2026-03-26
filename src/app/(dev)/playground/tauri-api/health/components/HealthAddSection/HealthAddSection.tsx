"use client";

import { useHealthPlaygroundShallowPick } from "../../model";
import styles from "./HealthAddSection.module.scss";

export function HealthAddSection() {
  const { addA, addB, addResult, setAddA, setAddB, runInvoke, callAdd } =
    useHealthPlaygroundShallowPick([
      "addA",
      "addB",
      "addResult",
      "setAddA",
      "setAddB",
      "runInvoke",
      "callAdd",
    ]);

  return (
    <section className={styles.section}>
      <h2>add</h2>
      <p>숫자 두 개</p>
      <div className={styles.row}>
        <input
          aria-label="a"
          value={addA}
          onChange={(e) => setAddA(e.currentTarget.value)}
          inputMode="numeric"
        />
        <span>+</span>
        <input
          aria-label="b"
          value={addB}
          onChange={(e) => setAddB(e.currentTarget.value)}
          inputMode="numeric"
        />
        <button type="button" onClick={() => runInvoke(() => callAdd())}>
          더하기
        </button>
      </div>
      {addResult !== null ? <p>결과: {addResult}</p> : null}
    </section>
  );
}
