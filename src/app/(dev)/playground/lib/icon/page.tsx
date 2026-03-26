import { IconPlaygroundGrid } from "./components";
import { IconPlaygroundStoreProvider } from "./model";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <IconPlaygroundStoreProvider>
      <main className={styles.page}>
        <header className={styles.pageHeader}>
          <h1>lib / icon</h1>
          <p>
            <code>public/icons</code> 기준으로 생성된 항목마다 색(
            <code>currentColor</code>)과 크기(px)를 바꿔 볼 수 있습니다.
          </p>
        </header>

        <IconPlaygroundGrid />
      </main>
    </IconPlaygroundStoreProvider>
  );
}
