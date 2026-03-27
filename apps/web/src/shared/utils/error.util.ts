/**
 * `catch`로 잡힌 `unknown` 값을 사용자에게 보여 줄 한 줄 메시지로 바꿉니다.
 */

export const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "알 수 없는 오류";
};
