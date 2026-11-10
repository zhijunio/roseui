import type { Metadata } from "next"
import { SettingsPage } from "./examples"

export const metadata: Metadata = {
  title: "Settings Page",
  description: "A responsive Profile block with section navigation and an unsaved changes bar.",
}

export default function SettingsPageRoute() {
  return <SettingsPage />
}
