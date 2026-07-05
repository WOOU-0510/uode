import { cancel, intro, outro } from "@clack/prompts";
import { spawn } from "node:child_process";
import { buildCommands } from "./commands";
import { pickCommand } from "./prompts";

const run = async () => {
  intro("uode");

  const command = await pickCommand();
  const commands = await buildCommands(command);

  outro(
    commands.map((item) => `${item.bin} ${item.args.join(" ")}`).join("\n"),
  );

  for (const item of commands) {
    const child = spawn(item.bin, item.args, { stdio: "inherit" });

    child.on("exit", (code) => {
      process.exit(code ?? 1);
    });
  }
};

run().catch((error: unknown) => {
  cancel(
    error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
  );
  process.exit(1);
});
