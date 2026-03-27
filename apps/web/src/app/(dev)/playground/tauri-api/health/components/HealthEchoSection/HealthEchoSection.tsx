"use client";

import { useHealthPlaygroundShallowPick } from "../../model";
import styles from "./HealthEchoSection.module.scss";

type HealthEchoSectionProps = Record<string, never>;

export const HealthEchoSection = (props: HealthEchoSectionProps) => {
  const {} = props;
  const {
    echoMessage,
    echoTimes,
    echoResult,
    setEchoMessage,
    setEchoTimes,
    runInvoke,
    callEcho,
  } = useHealthPlaygroundShallowPick([
    "echoMessage",
    "echoTimes",
    "echoResult",
    "setEchoMessage",
    "setEchoTimes",
    "runInvoke",
    "callEcho",
  ]);

  return (
    <section className={styles.section}>
      <h2>echo</h2>
      <p>
        객체 인자 — Rust 파라미터 이름이 <code>payload</code>이므로{" "}
        <code>
          invoke(&quot;echo&quot;, {"{"} payload: {"{"} message, times {"}"}{" "}
          {"}"})
        </code>
      </p>
      <div className={styles.row}>
        <input
          value={echoMessage}
          onChange={(e) => setEchoMessage(e.currentTarget.value)}
          placeholder="message"
          aria-label="echo message"
        />
        <input
          className={styles.timesInput}
          value={echoTimes}
          onChange={(e) => setEchoTimes(e.currentTarget.value)}
          placeholder="times (1–5, 생략 시 1)"
          aria-label="echo times"
        />
        <button type="button" onClick={() => runInvoke(() => callEcho())}>
          Echo
        </button>
      </div>
      {echoResult ? <p className={styles.echoResult}>{echoResult}</p> : null}
    </section>
  );
};
