import Link from "next/link";
import { FORM_COMPONENTS } from "./componentCatalog";
import styles from "./page.module.scss";

type FormPlaygroundPageProps = Record<string, never>;

const FormPlaygroundPage = (props: FormPlaygroundPageProps) => {
  const {} = props;

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <span className={styles.eyebrow}>@uode/base-ui-react</span>
        <h1>Form & feedback primitives</h1>
        <p>
          각 컴포넌트의 native 기본형, 스타일 커스텀형과 실제 조합 예시를 독립된
          페이지에서 확인합니다.
        </p>
      </header>

      <ul className={styles.componentGrid}>
        {FORM_COMPONENTS.map((component) => (
          <li key={component.slug}>
            <Link
              className={styles.componentCard}
              href={`/playground/package/base-ui-react/form/${component.slug}`}
            >
              <strong>{component.title}</strong>
              <span>{component.description}</span>
              <small>예시 보기 →</small>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default FormPlaygroundPage;
