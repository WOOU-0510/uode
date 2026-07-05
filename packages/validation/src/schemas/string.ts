import { z } from "zod";

export const nonEmptyString = z.string().trim().min(1);

export const url = z.string().trim().url();

export type NonEmptyString = z.infer<typeof nonEmptyString>;
export type Url = z.infer<typeof url>;
