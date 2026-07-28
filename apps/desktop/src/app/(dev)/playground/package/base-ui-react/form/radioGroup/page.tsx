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
  const [submitted, setSubmitted] = React.useState("제출 전");

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
        description="native radio를 유지한 채 Indicator와 카드만 교체하며 required와 FormData도 그대로 동작합니다."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(
              String(new FormData(event.currentTarget).get("plan") ?? "없음"),
            );
          }}
        >
          <RadioGroup.Root className={styles.choiceCards} name="plan" required>
            <RadioGroup.Legend className={styles.legend}>
              워크스페이스 플랜
            </RadioGroup.Legend>
            {PLANS.map(([value, title, description], index) => (
              <Label
                className={styles.choiceCard}
                data-selected={plan === value || undefined}
                data-disabled={index === PLANS.length - 1 || undefined}
                key={value}
              >
                <RadioGroup.Item
                  className={styles.hiddenControl}
                  value={value}
                  checked={plan === value}
                  disabled={index === PLANS.length - 1}
                  onChange={() => setPlan(value)}
                />
                <RadioGroup.Indicator className={styles.indicator} />
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
              </Label>
            ))}
          </RadioGroup.Root>
          <div className={styles.formResult}>
            <button type="submit">FormData 확인</button>
            <output>plan: {submitted}</output>
          </div>
        </form>
      </ExampleSection>
    </ExamplePage>
  );
};

export default RadioGroupPage;
