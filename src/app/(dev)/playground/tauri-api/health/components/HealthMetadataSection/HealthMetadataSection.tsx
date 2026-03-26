"use client";

import { useHealthPlaygroundShallowPick } from "../../model";
import styles from "./HealthMetadataSection.module.scss";

export function HealthMetadataSection() {
  const { metadata, runInvoke, callGetAppMetadata } =
    useHealthPlaygroundShallowPick([
      "metadata",
      "runInvoke",
      "callGetAppMetadata",
    ]);

  return (
    <section className={styles.section}>
      <h2>get_app_metadata</h2>
      <p>앱 이름·버전·플랫폼 (Rust AppHandle)</p>
      <button
        type="button"
        onClick={() => runInvoke(() => callGetAppMetadata())}
      >
        메타데이터 가져오기
      </button>
      {metadata ? (
        <pre className={styles.pre}>{JSON.stringify(metadata, null, 2)}</pre>
      ) : null}
    </section>
  );
}
