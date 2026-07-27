"use client";

import { Label, Textarea } from "@uode/base-ui-react";
import * as React from "react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import styles from "./page.module.scss";

type TextareaPageProps = Record<string, never>;

const TextareaPage = (props: TextareaPageProps) => {
  const {} = props;
  const [note, setNote] = React.useState("");

  return (
    <ExamplePage
      title="Textarea"
      description="크기 조절과 글자 수 피드백을 갖는 여러 줄 입력"
    >
      <ExampleSection
        title="기본 형태 · no className"
        description="rows, maxLength, resize 같은 브라우저의 여러 줄 입력 동작을 유지합니다."
      >
        <Label>
          메모
          <Textarea rows={4} placeholder="자유롭게 입력하세요." />
        </Label>
      </ExampleSection>

      <ExampleSection
        title="커스텀 형태"
        description="글자 수 피드백이 있는 노트와 전송 버튼을 포함한 composer 예시입니다."
      >
        <div className={styles.demoGrid}>
          <Label className={styles.stackedLabel}>
            회의 메모
            <Textarea
              className={styles.noteTextarea}
              rows={5}
              value={note}
              placeholder="결정 사항과 후속 작업을 기록하세요."
              onChange={(event) => setNote(event.currentTarget.value)}
            />
            <span className={styles.counter}>{note.length}/200</span>
          </Label>

          <Label className={styles.messageComposer}>
            <span>빠른 메시지</span>
            <Textarea rows={2} placeholder="Shift + Enter로 줄바꿈" />
            <button type="button">전송</button>
          </Label>
        </div>
      </ExampleSection>
    </ExamplePage>
  );
};

export default TextareaPage;
