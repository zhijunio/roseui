import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const targetRoot = process.cwd();
const sourceRoot = path.resolve(process.argv[2] ?? path.join(targetRoot, "..", "roseui-bak"));

if (!existsSync(sourceRoot)) {
  throw new Error(`Source project does not exist: ${sourceRoot}`);
}

if (path.resolve(sourceRoot) === path.resolve(targetRoot)) {
  throw new Error("Source and target projects must be different.");
}

function copy(source, target) {
  mkdirSync(path.dirname(target), { recursive: true });
  cpSync(source, target, { recursive: true });
}

function rewrite(content) {
  return content
    .replaceAll("@/lib/utils", "@/lib/utils")
    .replaceAll("@/data/avatar-data", "@/data/user")
    .replaceAll("@/components/workbench/component-preview", "@/components/examples/component-preview")
    .replaceAll("@/components/workbench/page-header", "@/components/examples/page-header")
    .replaceAll("@/app/(app)/components/", "@/components/examples/components/");
}

function rewritePage(content, slug) {
  return rewrite(content).replaceAll('from "./examples"', `from "@/components/examples/components/${slug}/examples"`);
}

function rewriteTree(directory) {
  for (const entry of readdirSync(directory)) {
    const file = path.join(directory, entry);
    if (statSync(file).isDirectory()) {
      rewriteTree(file);
      continue;
    }

    if (!/\.(tsx?|css)$/.test(entry)) continue;
    writeFileSync(file, rewrite(readFileSync(file, "utf8")));
  }
}

const sourceComponents = path.join(sourceRoot, "src", "components");
copy(path.join(sourceComponents, "ui"), path.join(targetRoot, "src", "components", "ui"));
copy(path.join(sourceComponents, "composite"), path.join(targetRoot, "src", "components", "composite"));

for (const helper of ["component-preview.tsx", "page-header.tsx"]) {
  copy(
    path.join(sourceComponents, "workbench", helper),
    path.join(targetRoot, "src", "components", "examples", helper),
  );
}

for (const hook of ["use-controlled-state.ts", "use-platform.ts"]) {
  copy(path.join(sourceRoot, "src", "hooks", hook), path.join(targetRoot, "src", "hooks", hook));
}

const sourceAvatarData = readFileSync(path.join(sourceRoot, "src", "data", "avatar-data.ts"), "utf8")
  .replace(/^import .*\n\n/, "")
  .replaceAll("getPersonByName", "getUserByName")
  .replaceAll("getPersonAvatar", "getUserAvatar")
  .replaceAll("people", "users")
  .replaceAll("Person", "User")
  .replace(/(\{ id: "([^"]+)", name: "[^"]+", )avatar:/g, '$1email: "$2@roseui.com", avatar:')
  .replace(
    "export type User = (typeof users)[number];",
    `export type User = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar: string;
};`,
  )
  .replace("] as const;", "] as const satisfies readonly User[];")
  .replace(/\n {2}role: "Administrator",/, "");
const targetUserPath = path.join(targetRoot, "src", "data", "user.ts");
const targetUser = readFileSync(targetUserPath, "utf8");
if (!targetUser.includes("export const users")) {
  writeFileSync(targetUserPath, `import { demoAvatarUrl } from "@/lib/utils";\n\n${sourceAvatarData.trim()}\n`);
}

const targetUtils = path.join(targetRoot, "src", "lib", "utils.ts");
const sourceUtils = readFileSync(path.join(sourceRoot, "src", "lib", "utils.ts"), "utf8");
const currentUtils = readFileSync(targetUtils, "utf8");
if (!currentUtils.includes("demoAvatarUrl")) {
  writeFileSync(targetUtils, `${currentUtils.trimEnd()}\n\n${sourceUtils}`);
}

const sourceExamples = path.join(sourceRoot, "src", "app", "(app)", "components");
const targetExamples = path.join(targetRoot, "src", "components", "examples", "components");
const targetRoutes = path.join(targetRoot, "src", "app", "(app)", "components");
const demoEntries = [];

for (const slug of readdirSync(sourceExamples).sort()) {
  const sourceDirectory = path.join(sourceExamples, slug);
  if (!statSync(sourceDirectory).isDirectory() || slug === "[slug]") continue;

  const targetDirectory = path.join(targetExamples, slug);
  copy(sourceDirectory, targetDirectory);
  rewriteTree(targetDirectory);
  const targetExamplePage = path.join(targetDirectory, "page.tsx");
  if (existsSync(targetExamplePage)) {
    rmSync(targetExamplePage);
  }

  const sourcePage = path.join(sourceDirectory, "page.tsx");
  if (!existsSync(sourcePage)) continue;

  const page = readFileSync(sourcePage, "utf8");
  const routeDirectory = path.join(targetRoutes, slug);
  mkdirSync(routeDirectory, { recursive: true });

  writeFileSync(path.join(routeDirectory, "page.tsx"), rewritePage(page, slug));

  const titleMatch = page.match(/title:\s*["']([^"']+)["']/);
  const title = titleMatch?.[1] ?? slug.replaceAll("-", " ");
  demoEntries.push({ slug, title });
}

const navItems = demoEntries
  .map(({ slug, title }) => `      { title: ${JSON.stringify(title)}, url: ${JSON.stringify(`/components/${slug}`)} },`)
  .join("\n");
const navPath = path.join(targetRoot, "src", "data", "nav.ts");
writeFileSync(
  navPath,
  `import { PanelsTopLeft, type LucideIcon } from "lucide-react";

export type NavSubItem = {
  title: string;
  url: string;
};

export type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: readonly NavSubItem[];
};

export type NavSection = {
  label: string;
  items: readonly NavItem[];
};

export const NAV_DATA = [
  {
    label: "Components",
    items: [
      {
        title: "UI",
        icon: PanelsTopLeft,
        items: [
${navItems}
        ],
      },
    ],
  },
] satisfies readonly NavSection[];
`,
);

console.log(
  `Migrated ${demoEntries.length} component demos, UI/composite sources, helpers, hooks, and data from ${sourceRoot}`,
);
