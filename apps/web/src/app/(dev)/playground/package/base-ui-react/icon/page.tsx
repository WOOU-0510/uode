import { IconPlaygroundGrid } from "./components";
import { IconPlaygroundStoreProvider } from "./model";
import styles from "./page.module.scss";

type IconPlaygroundPageProps = Record<string, never>;

const Page = (props: IconPlaygroundPageProps) => {
  const {} = props;
  return (
    <IconPlaygroundStoreProvider>
      <main className={styles.page}>
        <header className={styles.pageHeader}>
          <h1>package / base-ui-react / icon</h1>
          <p>
            <code>@uode/base-ui-react</code>의{" "}
            <code>assets/icons</code> 기준 SVGR 생성 아이콘마다 색(
            <code>currentColor</code>)과 크기(px)를 바꿔 볼 수 있습니다.
          </p>
        </header>

        <IconPlaygroundGrid />
      </main>
    </IconPlaygroundStoreProvider>
  );
};

export default Page;
