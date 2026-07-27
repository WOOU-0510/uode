"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import {
  Checkbox,
  Field,
  Input,
  Label,
  NativeSelect,
  RadioGroup,
  Textarea,
} from "@uode/base-ui-react";
import {
  accepted,
  displayName,
  email,
  requiredSelection,
  shortText,
} from "@uode/validation";
import * as React from "react";
import styles from "./tanStackValidationExample.module.scss";

const getErrorMessage = (error: unknown) => {
  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "입력값을 확인해 주세요.";
};

type TanStackValidationExampleProps = Record<string, never>;

export const TanStackValidationExample = (
  props: TanStackValidationExampleProps,
) => {
  const {} = props;
  const [submittedValue, setSubmittedValue] = React.useState(
    "유효한 값을 제출하면 결과가 표시됩니다.",
  );
  const form = useForm({
    defaultValues: {
      displayName: "",
      email: "",
      bio: "",
      team: "",
      contact: "",
      terms: false,
    },
    validationLogic: revalidateLogic(),
    onSubmit: ({ value }) => {
      setSubmittedValue(JSON.stringify(value, null, 2));
    },
  });

  return (
    <div className={styles.validationGrid}>
      <form
        className={styles.validationForm}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field name="displayName" validators={{ onDynamic: displayName }}>
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const error = field.state.meta.errors[0];

            return (
              <Field.Root
                className={styles.field}
                controlId={field.name}
                invalid={invalid}
                required
              >
                <Field.Label className={styles.fieldLabel}>
                  표시 이름
                </Field.Label>
                <Field.Control>
                  {(controlProps) => (
                    <Input
                      {...controlProps}
                      className={styles.textControl}
                      name={field.name}
                      value={field.state.value}
                      placeholder="두 글자 이상"
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.currentTarget.value)
                      }
                    />
                  )}
                </Field.Control>
                <Field.Description className={styles.description}>
                  displayName 스키마를 blur와 submit 시점에 사용합니다.
                </Field.Description>
                {invalid ? (
                  <Field.Error className={styles.error}>
                    {getErrorMessage(error)}
                  </Field.Error>
                ) : null}
              </Field.Root>
            );
          }}
        </form.Field>

        <form.Field name="email" validators={{ onDynamic: email }}>
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const error = field.state.meta.errors[0];

            return (
              <Field.Root
                className={styles.field}
                controlId={field.name}
                invalid={invalid}
                required
              >
                <Field.Label className={styles.fieldLabel}>이메일</Field.Label>
                <Field.Control>
                  {(controlProps) => (
                    <Input
                      {...controlProps}
                      className={styles.textControl}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      placeholder="name@example.com"
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.currentTarget.value)
                      }
                    />
                  )}
                </Field.Control>
                <Field.Description className={styles.description}>
                  기존 email 스키마를 그대로 주입합니다.
                </Field.Description>
                {invalid ? (
                  <Field.Error className={styles.error}>
                    {getErrorMessage(error)}
                  </Field.Error>
                ) : null}
              </Field.Root>
            );
          }}
        </form.Field>

        <form.Field name="bio" validators={{ onDynamic: shortText }}>
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const error = field.state.meta.errors[0];

            return (
              <Field.Root
                className={styles.field}
                controlId={field.name}
                invalid={invalid}
              >
                <Field.Label className={styles.fieldLabel}>소개</Field.Label>
                <Field.Control>
                  {(controlProps) => (
                    <Textarea
                      {...controlProps}
                      className={styles.textareaControl}
                      name={field.name}
                      rows={3}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.currentTarget.value)
                      }
                    />
                  )}
                </Field.Control>
                <Field.Description className={styles.description}>
                  {field.state.value.length}/160자
                </Field.Description>
                {invalid ? (
                  <Field.Error className={styles.error}>
                    {getErrorMessage(error)}
                  </Field.Error>
                ) : null}
              </Field.Root>
            );
          }}
        </form.Field>

        <form.Field name="team" validators={{ onDynamic: requiredSelection }}>
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const error = field.state.meta.errors[0];

            return (
              <Field.Root
                className={styles.field}
                controlId={field.name}
                invalid={invalid}
                required
              >
                <Field.Label className={styles.fieldLabel}>팀</Field.Label>
                <Field.Control>
                  {(controlProps) => (
                    <NativeSelect.Root
                      {...controlProps}
                      className={styles.textControl}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.currentTarget.value)
                      }
                    >
                      <NativeSelect.Option value="">
                        팀을 선택하세요
                      </NativeSelect.Option>
                      <NativeSelect.OptGroup label="제품">
                        <NativeSelect.Option value="product">
                          Product
                        </NativeSelect.Option>
                        <NativeSelect.Option value="design">
                          Design
                        </NativeSelect.Option>
                      </NativeSelect.OptGroup>
                      <NativeSelect.OptGroup label="기술">
                        <NativeSelect.Option value="frontend">
                          Frontend
                        </NativeSelect.Option>
                        <NativeSelect.Option value="backend">
                          Backend
                        </NativeSelect.Option>
                      </NativeSelect.OptGroup>
                    </NativeSelect.Root>
                  )}
                </Field.Control>
                {invalid ? (
                  <Field.Error className={styles.error}>
                    {getErrorMessage(error)}
                  </Field.Error>
                ) : null}
              </Field.Root>
            );
          }}
        </form.Field>

        <form.Field
          name="contact"
          validators={{ onDynamic: requiredSelection }}
        >
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const error = field.state.meta.errors[0];

            return (
              <Field.Root
                className={styles.field}
                controlId={`${field.name}-email`}
                invalid={invalid}
                required
              >
                <RadioGroup.Root
                  className={styles.radioChoices}
                  name={field.name}
                  onBlur={field.handleBlur}
                >
                  <RadioGroup.Legend className={styles.fieldLabel}>
                    선호 연락 방법
                  </RadioGroup.Legend>
                  <Label className={styles.choice}>
                    <RadioGroup.Item
                      id={`${field.name}-email`}
                      value="email"
                      checked={field.state.value === "email"}
                      onChange={() => field.handleChange("email")}
                    />
                    이메일
                  </Label>
                  <Label className={styles.choice}>
                    <RadioGroup.Item
                      value="chat"
                      checked={field.state.value === "chat"}
                      onChange={() => field.handleChange("chat")}
                    />
                    채팅
                  </Label>
                </RadioGroup.Root>
                {invalid ? (
                  <Field.Error className={styles.error}>
                    {getErrorMessage(error)}
                  </Field.Error>
                ) : null}
              </Field.Root>
            );
          }}
        </form.Field>

        <form.Field name="terms" validators={{ onDynamic: accepted }}>
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const error = field.state.meta.errors[0];

            return (
              <Field.Root
                className={styles.field}
                controlId={field.name}
                invalid={invalid}
                required
              >
                <Label className={styles.choice}>
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.currentTarget.checked)
                    }
                  />
                  이용 약관에 동의합니다.
                </Label>
                {invalid ? (
                  <Field.Error className={styles.error}>
                    {getErrorMessage(error)}
                  </Field.Error>
                ) : null}
              </Field.Root>
            );
          }}
        </form.Field>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <button
              className={styles.primaryButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중..." : "프로필 저장"}
            </button>
          )}
        </form.Subscribe>
      </form>

      <aside className={styles.resultPanel} aria-live="polite">
        <span>TanStack Form value</span>
        <pre>{submittedValue}</pre>
      </aside>
    </div>
  );
};
