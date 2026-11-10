import { ComponentPreview } from "@/components/composite/component-preview";
import { JsonViewer } from "@/components/ui/json-viewer";

const auditPayload = {
  event: "access.policy.updated",
  occurredAt: "2026-11-08T14:26:00Z",
  actor: { id: "usr_4821", name: "Mina Patel", role: "workspace-admin" },
  workspace: { id: "ws_1704", region: "ap-southeast", settings: { approvalRequired: true, sessionLimit: 8 } },
  changes: [
    { field: "approvalRequired", previous: false, current: true },
    { field: "sessionLimit", previous: 12, current: 8 },
    { field: "allowedDomains", previous: ["roseui.dev"], current: ["roseui.dev", "partners.example"] },
  ],
  result: null,
};

const importPreview = [
  { externalId: "acct-0831", name: "Harbor Research", enabled: true },
  { externalId: "acct-0832", name: "Juniper Works", enabled: false },
  { externalId: "acct-0833", name: "Pinecone Logistics", enabled: true },
  { externalId: "acct-0834", name: "Cedar Field Group", enabled: true },
];

export function JsonViewerExamples() {
  return (
    <div className="grid min-w-0 items-start gap-5 [&>*]:min-w-0">
      <ComponentPreview previewId="json-viewer-01" title="Access policy event" layout="fullStack">
        <JsonViewer data={auditPayload} label="Access policy event payload" />
      </ComponentPreview>
      <ComponentPreview previewId="json-viewer-02" title="Imported account records" layout="fullStack">
        <JsonViewer data={importPreview} label="Imported account records" rootName="accounts" pageSize={2} defaultExpanded />
      </ComponentPreview>
      <ComponentPreview previewId="json-viewer-03" title="Primitive response" layout="fullStack">
        <JsonViewer data={null} label="Primitive response" rootName="result" />
      </ComponentPreview>
    </div>
  );
}
