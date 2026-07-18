import { formatSuffixes, lintSuffixes } from "./options";
import { pickApps, pickSuffix } from "./prompts";
import type { RootCommand, RunCommand } from "./types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled command: ${value}`);
};

const splitSuffix = (suffix: string): readonly string[] =>
  suffix.length === 0 ? [] : suffix.split(/\s+/);

export const buildCommands = async (
  command: RootCommand,
): Promise<readonly RunCommand[]> => {
  switch (command) {
    case "dev":
    case "start": {
      const apps = await pickApps(command);

      if (command === "dev" && apps.includes("web")) {
        return [
          ...apps
            .filter((app) => app !== "web")
            .map((app) => ({
              bin: "bun",
              args: ["run", "--filter", app, "dev"],
            })),
          { bin: "bun", args: ["x", "tauri", "dev"] },
        ];
      }

      return [
        {
          bin: "bun",
          args: ["run", ...apps.flatMap((app) => ["--filter", app]), command],
        },
      ];
    }
    case "build":
      return [{ bin: "bun", args: ["x", "turbo", "run", "build"] }];
    case "lint": {
      const suffix = await pickSuffix(command, lintSuffixes);

      return [
        {
          bin: "bun",
          args: ["x", "turbo", "run", "lint", ...splitSuffix(suffix)],
        },
      ];
    }
    case "format": {
      const suffix = await pickSuffix(command, formatSuffixes);

      return [
        {
          bin: "bun",
          args: ["x", "biome", "format", "--write", ...splitSuffix(suffix)],
        },
      ];
    }
    case "ic:g":
      return [
        {
          bin: "bun",
          args: ["x", "turbo", "run", "ic:g", "--filter=@uode/base-ui-react"],
        },
      ];
    case "t:g":
      return [
        {
          bin: "bun",
          args: ["x", "turbo", "run", "t:g", "--filter=web"],
        },
      ];
    default:
      return assertNever(command);
  }
};
