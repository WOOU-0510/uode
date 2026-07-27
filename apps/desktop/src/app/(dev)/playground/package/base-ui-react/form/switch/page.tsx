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
        description="CSS로 track과 thumb를 그리고 controlled 상태를 설정 행에 연결합니다."
      >
        <div className={styles.settingsCard}>
          <Label className={styles.settingRow}>
            <span>
              <strong>데스크톱 알림</strong>
              <small>새 댓글과 멘션을 바로 알려줍니다.</small>
            </span>
            <Switch
              className={styles.switchControl}
              checked={settings.notifications}
              onChange={handleNotificationsChange}
            />
          </Label>
          <Label className={styles.settingRow}>
            <span>
              <strong>컴팩트 모드</strong>
              <small>목록의 세로 간격을 줄입니다.</small>
            </span>
            <Switch
              className={styles.switchControl}
              checked={settings.compact}
              onChange={handleCompactChange}
            />
          </Label>
        </div>
      </ExampleSection>
    </ExamplePage>
  );
};

export default SwitchPage;
