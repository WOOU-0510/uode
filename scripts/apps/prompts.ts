import { cancel, isCancel, multiselect, select, text } from "@clack/prompts";
import { appScripts, rootCommands } from "./options";
import type { AppName, AppScript, RootCommand, SuffixOption } from "./types";

const ask = async <T>(value: Promise<T | symbol>): Promise<T> => {
  const result = await value;

  if (isCancel(result)) {
    cancel("취소했습니다.");
    process.exit(0);
  }

  return result;
};

export const pickCommand = async (): Promise<RootCommand> =>
  ask(
    select<RootCommand>({
      message: "실행할 명령어를 고르세요.",
      options: rootCommands.map((command) => ({
        value: command.value,
        label: command.label,
        hint: command.hint,
      })),
    }),
  );

export const pickApps = async (
  script: AppScript["script"],
): Promise<readonly AppName[]> => {
  const options = appScripts.filter((item) => item.script === script);

  return ask(
    multiselect<AppName>({
      message: `${script}를 실행할 app을 고르세요.`,
      required: true,
      options: options.map((item) => ({
        value: item.app,
        label: item.app,
      })),
    }),
  );
};

export const pickSuffix = async (
  script: "lint" | "format",
  options: readonly SuffixOption[],
): Promise<string> => {
  const suffix = await ask(
    select<string>({
      message: `${script} 옵션을 고르세요.`,
      options: options.map((option) => ({
        value: option.value,
        label: option.label,
        hint: option.hint,
      })),
    }),
  );

  if (suffix !== "custom") {
    return suffix;
  }

  const input = await ask(
    text({
      message: `${script} 뒤에 붙일 값을 입력하세요.`,
      placeholder: script === "lint" ? "--filter=web" : "apps/web/src",
    }),
  );

  return input.trim();
};
