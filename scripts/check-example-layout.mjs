import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredDirectories = ["src/components/examples", "src/app/pre-blocks"];
const forbiddenDirectories = ["src/examples/components", "src/examples/blocks"];
const staleTokens = ["@/examples/components/", "@/examples/blocks/", "src/examples/components", "src/examples/blocks"];

function walk(directory) {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if ([".git", ".next", "node_modules", "public"].includes(entry.name)) continue;
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(entryPath));
    else files.push(entryPath);
  }

  return files;
}

const errors = [];

for (const directory of requiredDirectories) {
  if (!existsSync(path.join(root, directory))) errors.push(`Missing required directory: ${directory}`);
}

for (const directory of forbiddenDirectories) {
  if (existsSync(path.join(root, directory))) errors.push(`Found legacy directory: ${directory}`);
}

for (const file of walk(path.join(root, "src"))) {
  if (!/\.(mjs|ts|tsx)$/.test(file)) continue;
  const source = readFileSync(file, "utf8");
  for (const token of staleTokens) {
    if (source.includes(token)) errors.push(`${path.relative(root, file)} contains ${token}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log("Example and block source layout is valid.");
}
