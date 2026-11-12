import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const installedDependencies = new Set(Object.keys(packageJson.dependencies ?? {}));
const uiDirectory = path.join(root, "src", "components", "ui");

const compositeSourceFiles = new Set([
  "action-bar.tsx",
  "action-button.tsx",
  "arrow-link-button.tsx",
  "autocomplete.tsx",
  "avatar-button.tsx",
  "avatar-group.tsx",
  "avatar-upload.tsx",
  "billing-toggle.tsx",
  "cascader.tsx",
  "chat-thread.tsx",
  "checkbox-group.tsx",
  "color-picker.tsx",
  "comment-thread.tsx",
  "attachment.tsx",
  "button-group.tsx",
  "carousel.tsx",
  "combobox.tsx",
  "command.tsx",
  "field.tsx",
  "input-group.tsx",
  "input-otp.tsx",
  "message-scroller.tsx",
  "message.tsx",
  "pagination.tsx",
  "questionnaire.tsx",
  "resizable.tsx",
  "copy-button.tsx",
  "countdown.tsx",
  "data-table.tsx",
  "date-picker.tsx",
  "date-range-picker.tsx",
  "date-selector.tsx",
  "emoji-picker.tsx",
  "emoji-reaction-button.tsx",
  "error-state.tsx",
  "event-calendar.tsx",
  "expandable-button.tsx",
  "file-upload.tsx",
  "filters.tsx",
  "floating-toc.tsx",
  "hold-to-confirm.tsx",
  "inline-edit.tsx",
  "input-mention.tsx",
  "input-money.tsx",
  "input-phone.tsx",
  "input-tag.tsx",
  "labeled-checkbox.tsx",
  "labeled-radio.tsx",
  "labeled-switch.tsx",
  "list-view.tsx",
  "multi-select.tsx",
  "nav-user.tsx",
  "notification.tsx",
  "number-field.tsx",
  "number-stepper.tsx",
  "password-field.tsx",
  "password-strength.tsx",
  "payment-button.tsx",
  "payment-field.tsx",
  "radio-cards.tsx",
  "rating.tsx",
  "reaction-button.tsx",
  "reactions.tsx",
  "rich-text-editor.tsx",
  "scrollspy.tsx",
  "search-field.tsx",
  "search-select.tsx",
  "segmented-control.tsx",
  "signature-pad.tsx",
  "social-button.tsx",
  "sortable.tsx",
  "split-button.tsx",
  "stepper.tsx",
  "swipe-actions.tsx",
  "tag-group.tsx",
  "team-switcher.tsx",
  "time-picker.tsx",
  "timeline.tsx",
  "tree-table.tsx",
  "tree.tsx",
  "undo-toast.tsx",
  "user-menu.tsx",
  "verification-code-form.tsx",
]);
const collisionFiles = new Set([
  "attachment.tsx",
  "button-group.tsx",
  "carousel.tsx",
  "combobox.tsx",
  "command.tsx",
  "field.tsx",
  "input-group.tsx",
  "input-otp.tsx",
  "message-scroller.tsx",
  "message.tsx",
  "pagination.tsx",
  "questionnaire.tsx",
  "resizable.tsx",
]);
const registryComponentFiles = new Set(
  [...compositeSourceFiles].map((file) => (collisionFiles.has(file) ? `composite-${file}` : file)),
);
const uiFiles = new Set(readdirSync(uiDirectory).filter((file) => file.endsWith(".tsx")));

function componentName(file, kind) {
  const name = path.basename(file, path.extname(file));
  return kind === "registry:component" ? `composite-${name.replace(/^composite-/, "")}` : name;
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
      const hookMatch = imported.match(/^@\/hooks\/([^/]+)$/);

      if (uiMatch) {
        const importedFile = `${uiMatch[1]}.tsx`;
        if (registryComponentFiles.has(importedFile)) {
          registryDependencies.add(`composite-${uiMatch[1].replace(/^composite-/, "")}`);
        } else if (uiFiles.has(importedFile)) {
          registryDependencies.add(uiMatch[1]);
        }
      }
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

function createItem({ directory, file, type, targetDirectory, additionalFiles = [] }) {
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

  for (const additionalFile of additionalFiles) {
    const additionalSource = path.join(directory, additionalFile);
    files.push({
      path: path.relative(root, additionalSource).split(path.sep).join("/"),
      type: "registry:file",
      target: path.join(targetDirectory, additionalFile).split(path.sep).join("/"),
    });
  }

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
for (const file of readdirSync(uiDirectory)
  .filter((entry) => entry.endsWith(".tsx"))
  .sort()) {
  const type = registryComponentFiles.has(file) ? "registry:component" : "registry:ui";
  const additionalFiles =
    file === "filters.tsx"
      ? ["filters-query.ts"]
      : file === "social-button.tsx"
        ? ["social-color-logos.ts", "social-providers.ts"]
        : [];
  items.push(createItem({ directory: uiDirectory, file, type, targetDirectory: "src/components/ui", additionalFiles }));
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
