import type { AppScript, CommandOption, SuffixOption } from "./types";

export const rootCommands = [
  { value: "dev", label: "dev", hint: "실행할 app 선택" },
  { value: "build", label: "build", hint: "root build" },
  { value: "start", label: "start", hint: "실행할 app 선택" },
  { value: "lint", label: "lint", hint: "기본/범위/직접 입력" },
  { value: "format", label: "format", hint: "기본/경로/직접 입력" },
  { value: "ic:g", label: "icon create", hint: "root ic:g" },
  { value: "t:g", label: "type gen", hint: "root t:g" },
] as const satisfies readonly CommandOption[];

export const appScripts = [
  { app: "server", script: "dev" },
  { app: "web", script: "dev" },
  { app: "web", script: "start" },
] as const satisfies readonly AppScript[];

export const lintSuffixes = [
  { value: "", label: "기본", hint: "bun run lint" },
  { value: "--filter=web", label: "web만", hint: "turbo filter" },
  {
    value: "--filter=@uode/base-ui-react",
    label: "base-ui react만",
    hint: "turbo filter",
  },
  { value: "custom", label: "직접 입력" },
] as const satisfies readonly SuffixOption[];

export const formatSuffixes = [
  { value: "", label: "기본", hint: "bun run format" },
  { value: "apps/web", label: "apps/web", hint: "경로 지정" },
  { value: "packages/base-ui", label: "packages/base-ui", hint: "경로 지정" },
  { value: "custom", label: "직접 입력" },
] as const satisfies readonly SuffixOption[];
