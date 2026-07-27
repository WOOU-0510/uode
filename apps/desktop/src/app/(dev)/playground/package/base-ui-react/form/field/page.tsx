"use client";

import { Field, Input } from "@uode/base-ui-react";
import { ExamplePage, ExampleSection } from "../components/examplePage";
import { TanStackValidationExample } from "./components/tanStackValidationExample";

type FieldPageProps = Record<string, never>;

const FieldPage = (props: FieldPageProps) => {
  const {} = props;

  return (
    <ExamplePage
      title="Field"
      description="접근성 연결과 TanStack Form validation 조합"
    >
      <ExampleSection
        title="기본 형태 · no className"
        description="Field는 id와 aria-describedby만 연결하고 값이나 validation을 소유하지 않습니다."
      >
        <Field.Root controlId="plain-field">
          <Field.Label>사용자 이름</Field.Label>
          <Field.Control>
            {(controlProps) => <Input {...controlProps} />}
          </Field.Control>
          <Field.Description>공개 프로필에 표시됩니다.</Field.Description>
        </Field.Root>
      </ExampleSection>

      <ExampleSection
        title="TanStack Form + @uode/validation"
        description="필드 상태는 TanStack Form이 소유하고 Zod Standard Schema를 validator로 주입합니다."
      >
        <TanStackValidationExample />
      </ExampleSection>
    </ExamplePage>
  );
};

export default FieldPage;
