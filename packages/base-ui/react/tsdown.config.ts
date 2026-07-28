import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "icons/registry": "src/icons/index.ts",
    "icons/*": [
      "src/icons/generated/*.tsx",
      "!src/icons/generated/index.ts",
      "!src/icons/generated/registry.ts",
    ],
  },
});
