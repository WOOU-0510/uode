"use client";

import { Label, NativeSelect } from "@uode/base-ui-react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import styles from "./page.module.scss";

type NativeSelectPageProps = Record<string, never>;

const NativeSelectPage = (props: NativeSelectPageProps) => {
  const {} = props;

  return (
    <ExamplePage
      title="NativeSelect"
      description="option과 optgroup을 유지하는 native select"
    >
      <ExampleSection
        title="기본 형태 · no className"
        description="select, option, optgroup의 브라우저 동작과 키보드 접근성을 유지합니다."
      >
        <Label>
          언어
          <NativeSelect.Root defaultValue="ko">
            <NativeSelect.Option value="ko">한국어</NativeSelect.Option>
            <NativeSelect.Option value="en">English</NativeSelect.Option>
          </NativeSelect.Root>
        </Label>
      </ExampleSection>

      <ExampleSection
        title="커스텀 형태"
        description="그룹 선택과 작은 필터 형태를 동일한 native select로 구성합니다."
      >
        <div className={styles.demoGrid}>
          <Label className={styles.stackedLabel}>
            담당 팀
            <NativeSelect.Root
              className={styles.textControl}
              defaultValue="frontend"
            >
              <NativeSelect.OptGroup label="제품">
                <NativeSelect.Option value="product">
                  Product
                </NativeSelect.Option>
                <NativeSelect.Option value="design">Design</NativeSelect.Option>
              </NativeSelect.OptGroup>
              <NativeSelect.OptGroup label="기술">
                <NativeSelect.Option value="frontend">
                  Frontend
                </NativeSelect.Option>
                <NativeSelect.Option value="backend">
                  Backend
                </NativeSelect.Option>
              </NativeSelect.OptGroup>
            </NativeSelect.Root>
          </Label>
          <Label className={styles.inlineFilter}>
            정렬
            <NativeSelect.Root defaultValue="recent">
              <NativeSelect.Option value="recent">최신순</NativeSelect.Option>
              <NativeSelect.Option value="name">이름순</NativeSelect.Option>
              <NativeSelect.Option value="updated">수정순</NativeSelect.Option>
            </NativeSelect.Root>
          </Label>
        </div>
      </ExampleSection>
    </ExamplePage>
  );
};

export default NativeSelectPage;
