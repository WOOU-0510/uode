"use client";

import { Checkbox, Label } from "@uode/base-ui-react";
import * as React from "react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import styles from "./page.module.scss";

const OPTIONS = [
  ["mentions", "멘션", "나를 직접 언급할 때 알림"],
  ["comments", "댓글", "내 문서에 댓글이 달릴 때 알림"],
  ["digest", "주간 요약", "매주 월요일 활동 요약"],
] as const;

type CheckboxPageProps = Record<string, never>;

const CheckboxPage = (props: CheckboxPageProps) => {
  const {} = props;
  const [selected, setSelected] = React.useState(["comments"]);
  const toggle = (value: string, checked: boolean) => {
    setSelected((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    );
  };

  return (
    <ExamplePage
      title="Checkbox"
      description="native checked 상태와 선택 카드 스타일"
    >
      <ExampleSection
        title="기본 형태 · no className"
        description="실제 checkbox이므로 defaultChecked, required와 FormData가 그대로 동작합니다."
      >
        <div className={styles.unstyledStack}>
          <Label>
            <Checkbox defaultChecked /> 이메일 알림
          </Label>
          <Label>
            <Checkbox indeterminate /> 일부 항목 선택됨
          </Label>
          <Label>
            <Checkbox disabled /> 비활성 항목
          </Label>
        </div>
      </ExampleSection>

      <ExampleSection
        title="커스텀 형태"
        description="checked 상태를 외부에서 제어해 카드 전체에 선택 스타일을 적용합니다."
      >
        <div className={styles.choiceCards}>
          {OPTIONS.map(([value, title, description]) => {
            const checked = selected.includes(value);

            return (
              <Label
                className={styles.choiceCard}
                data-selected={checked || undefined}
                key={value}
              >
                <Checkbox
                  value={value}
                  checked={checked}
                  onChange={(event) =>
                    toggle(value, event.currentTarget.checked)
                  }
                />
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
              </Label>
            );
          })}
        </div>
      </ExampleSection>
    </ExamplePage>
  );
};

export default CheckboxPage;
