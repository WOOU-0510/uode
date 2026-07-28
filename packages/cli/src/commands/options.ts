import type { AppScript, CommandOption, SuffixOption } from "./types";

export const rootCommands = [
  { value: "dev", label: "dev", hint: "실행할 app 선택" },
  { value: "build", label: "build", hint: "root build" },
  { value: "start", label: "start", hint: "실행할 app 선택" },
  { value: "lint", label: "lint", hint: "기본/범위/직접 입력" },
  { value: "format", label: "format", hint: "기본/경로/직접 입력" },
  {
    value: "icon:create",
    label: "icon create",
    hint: "@uode/cli icon:create",
  },
  { value: "t:g", label: "type gen", hint: "root t:g" },
] as const satisfies readonly CommandOption[];

export const appScripts = [
  { app: "server", script: "dev" },
  { app: "desktop", script: "dev" },
  { app: "desktop", script: "start" },
] as const satisfies readonly AppScript[];

export const lintSuffixes = [
  { value: "", label: "기본", hint: "bun run lint" },
  { value: "--filter=desktop", label: "desktop만", hint: "turbo filter" },
  {
    value: "--filter=@uode/base-ui-react",
    label: "base-ui react만",
    hint: "turbo filter",
  },
  { value: "custom", label: "직접 입력" },
] as const satisfies readonly SuffixOption[];

export const formatSuffixes = [
  { value: "", label: "기본", hint: "bun run format" },
  { value: "apps/desktop", label: "apps/desktop", hint: "경로 지정" },
  { value: "packages/base-ui", label: "packages/base-ui", hint: "경로 지정" },
  { value: "custom", label: "직접 입력" },
] as const satisfies readonly SuffixOption[];
