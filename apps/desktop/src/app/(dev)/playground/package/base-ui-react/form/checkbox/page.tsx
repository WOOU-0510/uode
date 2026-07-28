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
  const [submitted, setSubmitted] = React.useState("제출 전");
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
            <Checkbox name="terms" defaultChecked required /> 필수 동의
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
        description="native input을 상태와 FormData의 원본으로 유지하고 Indicator만 CSS로 표현합니다."
      >
        <form
          className={styles.choiceCards}
          onSubmit={(event) => {
            event.preventDefault();
            const values = new FormData(event.currentTarget).getAll(
              "notifications",
            );
            setSubmitted(values.join(", ") || "선택 없음");
          }}
        >
          {OPTIONS.map(([value, title, description]) => {
            const checked = selected.includes(value);

            return (
              <Label
                className={styles.choiceCard}
                data-selected={checked || undefined}
                key={value}
              >
                <Checkbox
                  className={styles.hiddenControl}
                  name="notifications"
                  value={value}
                  checked={checked}
                  onChange={(event) =>
                    toggle(value, event.currentTarget.checked)
                  }
                />
                <Checkbox.Indicator className={styles.indicator} />
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
              </Label>
            );
          })}
          <Label className={styles.choiceCard} data-disabled>
            <Checkbox
              className={styles.hiddenControl}
              name="notifications"
              value="disabled"
              disabled
            />
            <Checkbox.Indicator className={styles.indicator} />
            <span>
              <strong>비활성 선택지</strong>
              <small>disabled control은 FormData에서 제외됩니다.</small>
            </span>
          </Label>
          <Label className={styles.choiceCard} data-mixed>
            <Checkbox
              className={styles.hiddenControl}
              name="notifications"
              value="partial"
              indeterminate
            />
            <Checkbox.Indicator className={styles.indicator} />
            <span>
              <strong>일부 선택</strong>
              <small>indeterminate 상태도 같은 Indicator로 표현합니다.</small>
            </span>
          </Label>
          <div className={styles.formResult}>
            <button type="submit">FormData 확인</button>
            <output>notifications: {submitted}</output>
          </div>
        </form>
      </ExampleSection>
    </ExamplePage>
  );
};

export default CheckboxPage;
