import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const appRoot = path.join(projectRoot, "src", "app", "(app)")
const outputPath = path.join(
  projectRoot,
  "src",
  "app",
  "preview",
  "preview-loaders.tsx"
)

function collectFiles(directory) {
  const files = []

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectFiles(filePath))
    } else if (/\.(tsx|ts)$/.test(entry.name)) {
      files.push(filePath)
    }
  }

  return files
}

function findOwningPage(filePath) {
  let directory = path.dirname(filePath)

  while (directory.startsWith(appRoot)) {
    const pagePath = path.join(directory, "page.tsx")
    if (fs.existsSync(pagePath)) return pagePath

    const parent = path.dirname(directory)
    if (parent === directory) break
    directory = parent
  }

  return null
}

function toImportPath(filePath) {
  const relativePath = path
    .relative(path.join(projectRoot, "src"), filePath)
    .replace(/\.(tsx|ts)$/, "")
    .replaceAll(path.sep, "/")
  return `@/${relativePath}`
}

const previews = new Map()

for (const filePath of collectFiles(appRoot)) {
  const source = fs.readFileSync(filePath, "utf8")
  const pagePath = findOwningPage(filePath)
  if (!pagePath) continue

  for (const match of source.matchAll(/previewId\s*(?:=|:)\s*["']([^"']+)["']/g)) {
    const previewId = match[1]
    const existingPage = previews.get(previewId)

    if (existingPage && existingPage !== pagePath) {
      throw new Error(
        `Preview id "${previewId}" belongs to more than one page: ${existingPage} and ${pagePath}`
      )
    }

    previews.set(previewId, pagePath)
  }
}

if (previews.size === 0) {
  throw new Error("No ComponentPreview previewId values were found")
}

const entries = [...previews.entries()].sort(([left], [right]) =>
  left.localeCompare(right, undefined, { numeric: true })
)

const aliases = entries
  .filter(([previewId]) => previewId.endsWith("-01"))
  .map(([previewId]) => [previewId.slice(0, -3), previewId])
  .filter(([alias]) => !previews.has(alias))
  .sort(([left], [right]) => left.localeCompare(right, undefined, { numeric: true }))

const output = [
  "import { lazy, type ComponentType, type LazyExoticComponent } from \"react\"",
  "",
  "export const previewLoaders = {",
  ...entries.map(
    ([previewId, pagePath]) =>
      `  ${JSON.stringify(previewId)}: lazy(() => import(${JSON.stringify(toImportPath(pagePath))})),`
  ),
  "} as const satisfies Record<string, LazyExoticComponent<ComponentType>>",
  "",
  "export type PreviewId = keyof typeof previewLoaders",
  "",
  "export const previewAliases = {",
  ...aliases.map(([alias, previewId]) => `  ${JSON.stringify(alias)}: ${JSON.stringify(previewId)},`),
  "} as const satisfies Record<string, PreviewId>",
  "",
  `// Generated from ${entries.length} ComponentPreview declarations. Do not edit by hand.`,
  "",
].join("\n")

fs.writeFileSync(outputPath, output)
console.log(`Generated ${entries.length} preview loaders at ${path.relative(projectRoot, outputPath)}`)
