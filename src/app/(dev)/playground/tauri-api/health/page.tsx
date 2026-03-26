import {
  HealthAddSection,
  HealthEchoSection,
  HealthGreetSection,
  HealthInvokeErrorBanner,
  HealthMetadataSection,
  HealthPingSection,
} from "./components";
import { HealthPlaygroundStoreProvider } from "./model";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <HealthPlaygroundStoreProvider>
      <main className={styles.page}>
        <header className={styles.pageHeader}>
          <h1>tauri-api / health</h1>
          <p>
            Rust <code>src-tauri/src/lab/</code>에 연결된 <code>invoke</code>{" "}
            커맨드를 모아 둔 페이지입니다.
          </p>
        </header>

        <HealthInvokeErrorBanner />
        <HealthGreetSection />
        <HealthPingSection />
        <HealthMetadataSection />
        <HealthAddSection />
        <HealthEchoSection />
      </main>
    </HealthPlaygroundStoreProvider>
  );
}
