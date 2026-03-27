import { transform } from "@svgr/core";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

type GenerateIconsArgs = {
  inputDir: string;
  outputDir: string;
};

type IconMeta = {
  iconName: string;
  componentName: string;
  relPathNoExt: string;
};

const getFlagValue = (argv: string[], flag: string): string | undefined => {
  const idx = argv.indexOf(flag);
  if (idx === -1) return undefined;
  const next = argv[idx + 1];
  if (next === undefined) return undefined;
  if (next.startsWith("--")) return undefined;
  return next;
};

const ensurePosixPath = (inputPath: string): string => {
  return inputPath.replace(/\\/g, "/");
};

const toIconName = (relNoExt: string): string => {
  return ensurePosixPath(relNoExt);
};

const toComponentName = (relNoExt: string): string => {
  const posix = ensurePosixPath(relNoExt);
  const segments = posix.split("/");
  const words: string[] = [];

  for (const segment of segments) {
    const parts = segment.split(/[-_]+/g).filter((part) => part.length > 0);
    for (const part of parts) {
      words.push(part);
    }
  }

  if (words.length === 0) return "SvgIcon";

  const pascal = words
    .map((word) => {
      const first = word.charAt(0).toUpperCase();
      return first + word.slice(1);
    })
    .join("");

  return `${pascal}Icon`;
};

const normalizeSvgColors = (svg: string): string => {
  let out = svg;

  out = out.replace(/fill="(?!none\b)(?!url\()[^"]*"/gi, 'fill="currentColor"');
  out = out.replace(/fill='(?!none\b)(?!url\()[^']*'/gi, "fill='currentColor'");
  out = out.replace(
    /stroke="(?!none\b)(?!url\()[^"]*"/gi,
    'stroke="currentColor"',
  );
  out = out.replace(
    /stroke='(?!none\b)(?!url\()[^']*'/gi,
    "stroke='currentColor'",
  );

  out = out.replace(/fill:\s*(?!none\b)(?!url\()[^;]+/gi, "fill: currentColor");
  out = out.replace(
    /stroke:\s*(?!none\b)(?!url\()[^;]+/gi,
    "stroke: currentColor",
  );

  out = out.replace(
    /stop-color:\s*(?!none\b)(?!url\()[^;]+/gi,
    "stop-color: currentColor",
  );

  return out;
};

const walkSvgFiles = async (dir: string): Promise<string[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkSvgFiles(fullPath)));
      continue;
    }

    const isSvg = entry.isFile() && entry.name.toLowerCase().endsWith(".svg");
    if (!isSvg) continue;
    files.push(fullPath);
  }

  return files;
};

const main = async (): Promise<void> => {
  const argv = process.argv.slice(2);

  const inputDir =
    getFlagValue(argv, "--input") ?? path.join("public", "icons");
  const outputDir =
    getFlagValue(argv, "--output") ??
    path.join("src", "shared", "lib", "icons", "generated");

  const args: GenerateIconsArgs = { inputDir, outputDir };

  const inputAbs = path.resolve(process.cwd(), args.inputDir);
  const outputAbs = path.resolve(process.cwd(), args.outputDir);

  const inputStat = await fs.stat(inputAbs).catch(() => null);
  if (inputStat === null || !inputStat.isDirectory()) {
    throw new Error(`SVG 입력 폴더가 없습니다: ${inputAbs}`);
  }

  await fs.mkdir(outputAbs, { recursive: true });

  const svgFiles = await walkSvgFiles(inputAbs);
  if (svgFiles.length === 0) {
    throw new Error(`SVG 파일을 찾지 못했습니다: ${inputAbs}`);
  }

  const metas: IconMeta[] = [];

  for (const svgFilePath of svgFiles) {
    const svgRaw = await fs.readFile(svgFilePath, "utf8");
    const svgNormalized = normalizeSvgColors(svgRaw);

    const relFromInput = path.relative(inputAbs, svgFilePath);
    const relNoExt = relFromInput.replace(/\.svg$/i, "");
    const iconName = toIconName(relNoExt);
    const componentName = toComponentName(relNoExt);

    const outFilePath = path.join(outputAbs, `${relNoExt}.tsx`);
    const outDirForFile = path.dirname(outFilePath);
    await fs.mkdir(outDirForFile, { recursive: true });

    const componentSource = await transform(
      svgNormalized,
      {
        typescript: true,
        icon: true,
        dimensions: false,
        expandProps: "end",
        svgo: false,
        prettier: false,
        jsxRuntime: "automatic",
        svgProps: {
          "aria-hidden": "true",
          focusable: "false",
        },
        plugins: ["@svgr/plugin-jsx"],
      },
      { componentName },
    );

    const componentSourceWithConvention = componentSource
      .replace(
        'import type { SVGProps } from "react";',
        'import * as React from "react";',
      )
      .replace(/SVGProps<SVGSVGElement>/g, "React.SVGProps<SVGSVGElement>")
      .replace(
        new RegExp(
          `const ${componentName} = \\(props: React\\.SVGProps<SVGSVGElement>\\) =>`,
        ),
        `type ${componentName}Props = React.SVGProps<SVGSVGElement>;\n\nconst ${componentName} = (props: ${componentName}Props) => {\n  const { ...svgProps } = props;\n  return`,
      )
      .replace(/\{\.\.\.props\}/g, "{...svgProps}")
      .replace(/;\nexport default /, ";\n};\nexport default ");

    await fs.writeFile(outFilePath, componentSourceWithConvention, "utf8");

    const relPathNoExt = ensurePosixPath(
      path.relative(outputAbs, outFilePath).replace(/\.tsx$/i, ""),
    );
    metas.push({ iconName, componentName, relPathNoExt });
  }

  metas.sort((a, b) => a.iconName.localeCompare(b.iconName));

  const duplicateNames = new Map<string, number>();
  for (const meta of metas) {
    duplicateNames.set(
      meta.iconName,
      (duplicateNames.get(meta.iconName) ?? 0) + 1,
    );
  }
  const duped = [...duplicateNames.entries()]
    .filter(([, count]) => count > 1)
    .map(([name]) => name);
  if (duped.length > 0) {
    throw new Error(`중복된 icon name이 있습니다: ${duped.join(", ")}`);
  }

  const importLines = metas.map(
    (meta) => `import ${meta.componentName} from "./${meta.relPathNoExt}";`,
  );

  const iconNamesLiteral = metas
    .map((meta) => `  ${JSON.stringify(meta.iconName)},`)
    .join("\n");

  const registryEntries = metas.map((meta) => {
    const key =
      /^[A-Za-z_$][\w$]*$/.test(meta.iconName) && !meta.iconName.includes("/")
        ? meta.iconName
        : JSON.stringify(meta.iconName);
    return `  ${key}: ${meta.componentName},`;
  });

  const registrySource = `/* 이 파일은 scripts/svgr-generate-icons.ts에 의해 자동 생성됩니다. 직접 수정하지 마세요. */

import * as React from "react";

${importLines.join("\n")}

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export const ICON_NAMES = [
${iconNamesLiteral}
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export const ICON_REGISTRY = {
${registryEntries.join("\n")}
} satisfies Record<IconName, IconComponent>;
`;

  await fs.writeFile(
    path.join(outputAbs, "registry.ts"),
    registrySource,
    "utf8",
  );

  const barrelLines = [
    'export * from "./registry";',
    ...metas.map(
      (meta) =>
        `export { default as ${meta.componentName} } from "./${meta.relPathNoExt}";`,
    ),
  ];

  await fs.writeFile(
    path.join(outputAbs, "index.ts"),
    `${barrelLines.join("\n")}\n`,
    "utf8",
  );

  console.log(`[svgr] icons generated to: ${outputAbs}`);
  console.log(`[svgr] registry: ${path.join(outputAbs, "registry.ts")}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
