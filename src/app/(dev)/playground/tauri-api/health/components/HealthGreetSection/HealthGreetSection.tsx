"use client";

import { useHealthPlaygroundShallowPick } from "../../model";
import styles from "./HealthGreetSection.module.scss";

export function HealthGreetSection() {
  const { name, setName, greetMsg, runInvoke, callGreet } =
    useHealthPlaygroundShallowPick([
      "name",
      "setName",
      "greetMsg",
      "runInvoke",
      "callGreet",
    ]);

  return (
    <section className={styles.section}>
      <h2>greet</h2>
      <p>문자열 인자 → 문자열 응답</p>
      <form
        className={styles.row}
        onSubmit={(e) => {
          e.preventDefault();
          runInvoke(() => callGreet());
        }}
      >
        <input
          id="greet-input"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      {greetMsg ? <p>{greetMsg}</p> : null}
    </section>
  );
}
