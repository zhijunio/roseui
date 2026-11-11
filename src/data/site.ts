import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const PROJECT_CONFIG = {
  name: "RoseUI",
  description: "A modular component workbench built with Next.js, Tailwind CSS, and shadcn/ui.",
  version: packageJson.version,
  copyright: `© ${currentYear}, All Rights Reserved.`,
};
