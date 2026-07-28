export type RootCommand =
  | "dev"
  | "build"
  | "start"
  | "lint"
  | "format"
  | "icon:create"
  | "t:g";

export type AppName = "desktop" | "server";

export type AppScript = {
  readonly app: AppName;
  readonly script: "dev" | "start";
};

export type CommandOption = {
  readonly value: RootCommand;
  readonly label: string;
  readonly hint: string;
};

export type SuffixOption = {
  readonly value: string;
  readonly label: string;
  readonly hint?: string;
};

export type RunCommand = {
  readonly bin: string;
  readonly args: readonly string[];
};
