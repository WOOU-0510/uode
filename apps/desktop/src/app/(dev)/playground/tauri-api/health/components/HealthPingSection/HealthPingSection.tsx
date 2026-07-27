"use client";

import { useHealthPlaygroundShallowPick } from "../../model";
import styles from "./HealthPingSection.module.scss";

type HealthPingSectionProps = Record<string, never>;

export const HealthPingSection = (props: HealthPingSectionProps) => {
  const {} = props;
  const { pingResult, runInvoke, callPing } = useHealthPlaygroundShallowPick([
    "pingResult",
    "runInvoke",
    "callPing",
  ]);

  return (
    <section className={styles.section}>
      <h2>ping</h2>
      <p>인자 없음 → 고정 문자열</p>
      <button type="button" onClick={() => runInvoke(() => callPing())}>
        Ping
      </button>
      {pingResult ? <p>결과: {pingResult}</p> : null}
    </section>
  );
};
