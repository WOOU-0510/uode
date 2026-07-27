"use client";

import { Input, Label, Switch } from "@uode/base-ui-react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import styles from "./page.module.scss";

type LabelPageProps = Record<string, never>;

const LabelPage = (props: LabelPageProps) => {
  const {} = props;

  return (
    <ExamplePage
      title="Label"
      description="native label 연결과 중첩 control 패턴"
    >
      <ExampleSection
        title="기본 형태 · no className"
        description="htmlFor 연결과 control 중첩 모두 native label 동작을 그대로 사용합니다."
      >
        <div className={styles.unstyledStack}>
          <Label htmlFor="plain-label-input">프로젝트 이름</Label>
          <Input id="plain-label-input" />
          <Label>
            검색어
            <Input type="search" />
          </Label>
        </div>
      </ExampleSection>

      <ExampleSection
        title="커스텀 형태"
        description="필수 표시, 설명, 가로 배치처럼 소비처가 필요한 시각 계약을 조합합니다."
      >
        <div className={styles.demoGrid}>
          <Label className={styles.stackedLabel}>
            <span>
              워크스페이스 이름 <b className={styles.requiredMark}>필수</b>
            </span>
            <Input className={styles.textControl} placeholder="Design System" />
            <small>URL과 초대 화면에 표시됩니다.</small>
          </Label>
          <Label className={styles.inlineLabel}>
            <span>공개 프로필</span>
            <Switch className={styles.switchControl} />
          </Label>
        </div>
      </ExampleSection>
    </ExamplePage>
  );
};

export default LabelPage;
