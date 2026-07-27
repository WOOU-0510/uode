"use client";

import { Input, Label } from "@uode/base-ui-react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import styles from "./page.module.scss";

type InputPageProps = Record<string, never>;

const InputPage = (props: InputPageProps) => {
  const {} = props;

  return (
    <ExamplePage
      title="Input"
      description="text, search, number 등 native input 조합"
    >
      <ExampleSection
        title="기본 형태 · no className"
        description="type, placeholder, required 등 모든 native input props를 전달합니다."
      >
        <div className={styles.unstyledStack}>
          <Input aria-label="기본 텍스트" placeholder="텍스트" />
          <Input aria-label="기본 이메일" type="email" placeholder="이메일" />
          <Input aria-label="기본 날짜" type="date" />
        </div>
      </ExampleSection>

      <ExampleSection
        title="커스텀 형태"
        description="검색창, 단위 입력과 상태 스타일도 wrapper와 className만으로 구성합니다."
      >
        <div className={styles.demoGrid}>
          <Label className={styles.stackedLabel}>
            검색
            <span className={styles.inputShell}>
              <span aria-hidden>⌕</span>
              <Input type="search" placeholder="문서 검색" />
              <kbd>⌘ K</kbd>
            </span>
          </Label>
          <Label className={styles.stackedLabel}>
            월 예산
            <span className={styles.inputShell}>
              <span aria-hidden>₩</span>
              <Input type="number" min={0} placeholder="500000" />
              <small>KRW</small>
            </span>
          </Label>
        </div>
      </ExampleSection>
    </ExamplePage>
  );
};

export default InputPage;
