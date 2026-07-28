"use client";

import { Label, Switch } from "@uode/base-ui-react";
import * as React from "react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import styles from "./page.module.scss";

type SwitchPageProps = Record<string, never>;

const SwitchPage = (props: SwitchPageProps) => {
  const {} = props;
  const [settings, setSettings] = React.useState({
    notifications: true,
    compact: false,
  });
  const [submitted, setSubmitted] = React.useState("제출 전");
  const handleNotificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.currentTarget.checked;
    setSettings((current) => ({ ...current, notifications: checked }));
  };
  const handleCompactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    setSettings((current) => ({ ...current, compact: checked }));
  };

  return (
    <ExamplePage
      title="Switch"
      description="checkbox 기반 boolean 설정 control"
    >
      <ExampleSection
        title="기본 형태 · no className"
        description="native checkbox에 role=switch를 더하며 boolean 상태는 브라우저나 소비처가 소유합니다."
      >
        <div className={styles.unstyledStack}>
          <Label>
            <Switch defaultChecked /> 자동 저장
          </Label>
          <Label>
            <Switch disabled /> 실험 기능
          </Label>
        </div>
      </ExampleSection>

      <ExampleSection
        title="커스텀 형태"
        description="native switch를 상태와 FormData 원본으로 두고 Track과 Thumb만 CSS로 표현합니다."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const values = [...new FormData(event.currentTarget).keys()];
            setSubmitted(values.join(", ") || "켜진 설정 없음");
          }}
        >
          <div className={styles.settingsCard}>
            <Label className={styles.settingRow}>
              <span>
                <strong>데스크톱 알림</strong>
                <small>새 댓글과 멘션을 바로 알려줍니다.</small>
              </span>
              <span className={styles.switchVisual}>
                <Switch
                  className={styles.hiddenControl}
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleNotificationsChange}
                />
                <Switch.Track className={styles.track}>
                  <Switch.Thumb className={styles.thumb} />
                </Switch.Track>
              </span>
            </Label>
            <Label className={styles.settingRow}>
              <span>
                <strong>컴팩트 모드</strong>
                <small>목록의 세로 간격을 줄입니다.</small>
              </span>
              <span className={styles.switchVisual}>
                <Switch
                  className={styles.hiddenControl}
                  name="compact"
                  checked={settings.compact}
                  onChange={handleCompactChange}
                />
                <Switch.Track className={styles.track}>
                  <Switch.Thumb className={styles.thumb} />
                </Switch.Track>
              </span>
            </Label>
            <Label className={styles.settingRow} data-disabled>
              <span>
                <strong>실험 기능</strong>
                <small>disabled switch는 제출 값에서도 제외됩니다.</small>
              </span>
              <span className={styles.switchVisual}>
                <Switch
                  className={styles.hiddenControl}
                  name="experimental"
                  disabled
                />
                <Switch.Track className={styles.track}>
                  <Switch.Thumb className={styles.thumb} />
                </Switch.Track>
              </span>
            </Label>
          </div>
          <div className={styles.formResult}>
            <button type="submit">FormData 확인</button>
            <output>{submitted}</output>
          </div>
        </form>
      </ExampleSection>
    </ExamplePage>
  );
};

export default SwitchPage;
