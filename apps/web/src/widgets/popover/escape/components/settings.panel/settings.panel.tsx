"use client";

import * as React from "react";
import type { Popover } from "@uode/base-ui-react";
import {
  checkForAppUpdate,
  downloadAndInstallLatestUpdate,
  type UpdateCheckResult,
} from "@/shared/lib/tauri";
import { toErrorMessage } from "@/shared/utils";
import styles from "./settings.panel.module.scss";

type EscapeSettingsPanelProps = {
  controller: Popover.Controller;
};

export const EscapeSettingsPanel = (props: EscapeSettingsPanelProps) => {
  const { controller } = props;
  const [updateInfo, setUpdateInfo] = React.useState<UpdateCheckResult | null>(
    null,
  );
  const [isChecking, setIsChecking] = React.useState(false);
  const [isInstalling, setIsInstalling] = React.useState(false);
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const handleCheckUpdate = React.useCallback(async () => {
    setFeedback(null);
    setIsChecking(true);
    try {
      const nextInfo = await checkForAppUpdate();
      setUpdateInfo(nextInfo);
      if (!nextInfo.available) {
        setFeedback("현재 최신 버전입니다.");
        return;
      }
      const versionText =
        nextInfo.version === null ? "새 버전" : `v${nextInfo.version}`;
      setFeedback(`${versionText} 업데이트가 있습니다.`);
    } catch (error) {
      setFeedback(`업데이트 확인 실패: ${toErrorMessage(error)}`);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const handleInstallUpdate = React.useCallback(async () => {
    setFeedback(null);
    setIsInstalling(true);
    try {
      const installed = await downloadAndInstallLatestUpdate();
      if (!installed) {
        setFeedback("설치할 업데이트가 없습니다.");
        return;
      }
      setFeedback(
        "업데이트 설치를 시작했습니다. 앱 재시작이 필요할 수 있습니다.",
      );
    } catch (error) {
      setFeedback(`업데이트 설치 실패: ${toErrorMessage(error)}`);
    } finally {
      setIsInstalling(false);
    }
  }, []);

  const isBusy = isChecking || isInstalling;
  const hasUpdate = updateInfo?.available === true;

  return (
    <>
      <h2 className={styles.title}>설정</h2>
      <p className={styles.sub}>
        앱 업데이트 상태를 확인하고 설치할 수 있습니다.
      </p>
      <section className={styles.section}>
        <p className={styles.label}>앱 업데이트</p>
        {hasUpdate ? (
          <p className={styles.status}>
            새 버전 {updateInfo.version ?? "(버전 정보 없음)"}
          </p>
        ) : null}
        {updateInfo?.body ? (
          <p className={styles.note}>{updateInfo.body}</p>
        ) : null}
        {feedback !== null ? <p className={styles.status}>{feedback}</p> : null}
      </section>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => void handleCheckUpdate()}
          disabled={isBusy}
        >
          {isChecking ? "확인 중..." : "업데이트 확인"}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => void handleInstallUpdate()}
          disabled={isBusy || !hasUpdate}
        >
          {isInstalling ? "설치 중..." : "업데이트 설치"}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => controller.closeTopPanel()}
          disabled={isBusy}
        >
          닫기
        </button>
      </div>
    </>
  );
};
