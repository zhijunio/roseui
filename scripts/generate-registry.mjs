import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const installedDependencies = new Set(Object.keys(packageJson.dependencies ?? {}));

function componentName(file, kind) {
  const name = path.basename(file, path.extname(file));
  return kind === "registry:component" ? `composite-${name}` : name;
}

function readImports(file) {
  const source = readFileSync(file, "utf8");
  return [...source.matchAll(/from\s+["']([^"']+)["']/g)].map((match) => match[1]);
}

function collectDependencies(files) {
  const dependencies = new Set();
  const registryDependencies = new Set();

  for (const file of files) {
    for (const imported of readImports(file)) {
      const uiMatch = imported.match(/^@\/components\/ui\/([^/]+)$/);
      const compositeMatch = imported.match(/^@\/components\/composite\/([^/]+)$/);
      const hookMatch = imported.match(/^@\/hooks\/([^/]+)$/);

      if (uiMatch) registryDependencies.add(uiMatch[1]);
      if (compositeMatch) registryDependencies.add(`composite-${compositeMatch[1]}`);
      if (hookMatch) registryDependencies.add(hookMatch[1]);
      if (imported === "@/lib/utils") {
        registryDependencies.add("utils");
      }

      const packageName = imported.startsWith("@") ? imported.split("/").slice(0, 2).join("/") : imported.split("/")[0];
      if (installedDependencies.has(packageName) && !["next", "react", "react-dom"].includes(packageName)) {
        dependencies.add(packageName);
      }
    }
  }

  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  };
}

function createItem({ directory, file, type, targetDirectory }) {
  const sourceFile = path.join(directory, file);
  const relativeSource = path.relative(root, sourceFile).split(path.sep).join("/");
  const target = path.join(targetDirectory, file).split(path.sep).join("/");
  const files = [
    {
      path: relativeSource,
      type,
      target,
    },
  ];

  const cssModule = path.join(directory, `${path.basename(file, ".tsx")}.module.css`);
  if (existsSync(cssModule)) {
    files.push({
      path: path.relative(root, cssModule).split(path.sep).join("/"),
      type: "registry:file",
      target: path.join(targetDirectory, path.basename(cssModule)).split(path.sep).join("/"),
    });
  }

  const { dependencies, registryDependencies } = collectDependencies(
    files.map(({ path: filePath }) => path.join(root, filePath)),
  );
  const name = componentName(file, type);

  return {
    name,
    type,
    title: name,
    description: `RoseUI ${name} component.`,
    ...(dependencies.length > 0 ? { dependencies } : {}),
    ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
    files,
  };
}

const items = [];
for (const [directoryName, type, targetDirectory] of [
  ["ui", "registry:ui", "src/components/ui"],
  ["composite", "registry:component", "src/components/composite"],
]) {
  const directory = path.join(root, "src", "components", directoryName);
  for (const file of readdirSync(directory)
    .filter((entry) => entry.endsWith(".tsx"))
    .sort()) {
    items.push(createItem({ directory, file, type, targetDirectory }));
  }
}

items.push({
  name: "utils",
  type: "registry:lib",
  title: "utils",
  description: "RoseUI class name and example data helpers.",
  dependencies: ["clsx", "tailwind-merge"],
  files: [
    {
      path: "src/lib/utils.ts",
      type: "registry:lib",
      target: "src/lib/utils.ts",
    },
  ],
});

for (const file of ["use-controlled-state.ts", "use-platform.ts"]) {
  const sourceFile = path.join(root, "src", "hooks", file);
  items.push({
    name: path.basename(file, ".ts"),
    type: "registry:hook",
    title: path.basename(file, ".ts"),
    description: `RoseUI ${path.basename(file, ".ts")} hook.`,
    files: [
      {
        path: path.relative(root, sourceFile).split(path.sep).join("/"),
        type: "registry:hook",
        target: path.join("src/hooks", file).split(path.sep).join("/"),
      },
    ],
  });
}

writeFileSync(
  path.join(root, "registry.json"),
  `${JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "roseui",
      homepage: "https://github.com/zhijunio/roseui",
      items,
    },
    null,
    2,
  )}\n`,
);
rmSync(path.join(root, "public", "r", "cn.json"), { force: true });

console.log(`Generated registry.json with ${items.length} items.`);
