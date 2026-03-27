import {
  WindowPlaygroundActions,
  WindowPlaygroundErrorBanner,
} from "./components";
import { WindowPlaygroundStoreProvider } from "./model";
import styles from "./page.module.scss";

type WindowPlaygroundPageProps = Record<string, never>;

const Page = (props: WindowPlaygroundPageProps) => {
  const {} = props;
  return (
    <WindowPlaygroundStoreProvider>
      <main className={styles.page}>
        <header className={styles.pageHeader}>
          <h1>tauri-api / window</h1>
          <p>
            <code>@tauri-apps/api/window</code>의 현재 창 제어를 시험합니다. 웹
            브라우저에서는 동작하지 않습니다.
          </p>
        </header>

        <WindowPlaygroundErrorBanner />
        <WindowPlaygroundActions />
      </main>
    </WindowPlaygroundStoreProvider>
  );
};

export default Page;
