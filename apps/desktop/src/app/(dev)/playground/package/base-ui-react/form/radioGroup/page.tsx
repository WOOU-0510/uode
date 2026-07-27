"use client";

import { Label, RadioGroup } from "@uode/base-ui-react";
import * as React from "react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import styles from "./page.module.scss";

const PLANS = [
  ["personal", "Personal", "개인 프로젝트 3개"],
  ["team", "Team", "무제한 프로젝트와 협업"],
  ["company", "Company", "감사 로그와 접근 제어"],
] as const;

type RadioGroupPageProps = Record<string, never>;

const RadioGroupPage = (props: RadioGroupPageProps) => {
  const {} = props;
  const [plan, setPlan] = React.useState("team");

  return (
    <ExamplePage
      title="RadioGroup"
      description="fieldset 기반 단일 선택과 카드형 선택지"
    >
      <ExampleSection
        title="기본 형태 · no className"
        description="fieldset, legend와 같은 name을 가진 native radio를 렌더링합니다."
      >
        <RadioGroup.Root name="plain-contact">
          <RadioGroup.Legend>연락 방법</RadioGroup.Legend>
          <Label>
            <RadioGroup.Item value="email" defaultChecked /> 이메일
          </Label>
          <Label>
            <RadioGroup.Item value="phone" /> 전화
          </Label>
        </RadioGroup.Root>
      </ExampleSection>

      <ExampleSection
        title="커스텀 형태"
        description="radio의 checked 상태를 카드와 동기화한 플랜 선택 예시입니다."
      >
        <RadioGroup.Root className={styles.choiceCards} name="plan">
          <RadioGroup.Legend className={styles.legend}>
            워크스페이스 플랜
          </RadioGroup.Legend>
          {PLANS.map(([value, title, description]) => (
            <Label
              className={styles.choiceCard}
              data-selected={plan === value || undefined}
              key={value}
            >
              <RadioGroup.Item
                value={value}
                checked={plan === value}
                onChange={() => setPlan(value)}
              />
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
            </Label>
          ))}
        </RadioGroup.Root>
      </ExampleSection>
    </ExamplePage>
  );
};

export default RadioGroupPage;
