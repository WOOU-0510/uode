import { z } from "zod";

export const displayName = z
  .string()
  .trim()
  .min(2, "2자 이상 입력해 주세요.")
  .max(40, "40자 이하로 입력해 주세요.");

export const shortText = z
  .string()
  .trim()
  .max(160, "160자 이하로 입력해 주세요.");

export const requiredSelection = z
  .string()
  .trim()
  .min(1, "하나를 선택해 주세요.");

export const accepted = z
  .boolean()
  .refine((value) => value, "동의가 필요합니다.");

export type DisplayName = z.infer<typeof displayName>;
export type ShortText = z.infer<typeof shortText>;
