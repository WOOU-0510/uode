"use client";

import { VisuallyHidden } from "@uode/base-ui-react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import styles from "./page.module.scss";

type VisuallyHiddenPageProps = Record<string, never>;

const VisuallyHiddenPage = (props: VisuallyHiddenPageProps) => {
  const {} = props;

  return (
    <ExamplePage
      title="VisuallyHidden"
      description="아이콘 control과 skip link의 접근성 텍스트"
    >
      <ExampleSection
        title="기본 형태 · no custom className"
        description="보이는 아이콘과 숨겨진 텍스트를 결합해 버튼의 accessible name을 만듭니다."
      >
        <button type="button">
          <span aria-hidden>↻</span>
          <VisuallyHidden>새로고침</VisuallyHidden>
        </button>
      </ExampleSection>

      <ExampleSection
        title="커스텀 형태"
        description="원형 icon button과 키보드 focus에서 나타나는 skip link로 활용합니다."
      >
        <div className={styles.hiddenExamples}>
          <button className={styles.iconButton} type="button">
            <span aria-hidden>⋯</span>
            <VisuallyHidden>더 많은 작업</VisuallyHidden>
          </button>
          <a className={styles.skipAnchor} href="#hidden-target">
            <VisuallyHidden className={styles.skipText}>
              본문으로 이동
            </VisuallyHidden>
          </a>
          <span id="hidden-target">
            Tab 키로 숨겨진 텍스트를 확인해 보세요.
          </span>
        </div>
      </ExampleSection>
    </ExamplePage>
  );
};

export default VisuallyHiddenPage;
