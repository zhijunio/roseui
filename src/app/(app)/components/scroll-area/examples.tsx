import { ComponentPreview } from "@/components/composite/component-preview"
import { ScrollArea } from "@/components/ui/scroll-area"

const rows = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  name: ["Maya Chen", "Alex Rivera", "Sam Patel"][index % 3],
  action: [
    "updated project brief",
    "reviewed a pull request",
    "shared a workspace file",
  ][index % 3],
  time: `${9 + Math.floor(index / 3)}:${String((index * 7) % 60).padStart(2, "0")}`,
}))

const projects = [
  "Website refresh",
  "Mobile app",
  "Design system",
  "Q4 planning",
  "Customer portal",
  "Analytics",
]

export function ScrollAreaExamples() {
  return (
    <>
      <ComponentPreview previewId="scroll-area-01" title="Recent Activity Feed" layout="panel" span={2}>
        <ScrollArea aria-label="Activity feed" className="h-64 w-full rounded-lg border">
          <ul className="divide-y px-4">
            {rows.map((row) => (
              <li key={row.id} className="flex items-center justify-between gap-4 py-3">
                <p className="min-w-0 text-sm">
                  <span className="font-medium">{row.name}</span>{" "}
                  <span className="text-muted-foreground">{row.action}</span>
                </p>
                <time className="shrink-0 text-xs text-muted-foreground">{row.time}</time>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </ComponentPreview>

      <ComponentPreview previewId="scroll-area-02" title="Horizontal Project Strip">
        <ScrollArea
          fadeEdges
          orientation="horizontal"
          aria-label="Project strip"
          className="h-36 w-full rounded-lg border"
        >
          <div className="flex h-full w-max items-center gap-3 p-3">
            {projects.map((project, index) => (
              <div
                key={project}
                className="flex h-24 w-48 flex-col justify-between rounded-lg border bg-card p-3"
              >
                <span className="text-sm font-medium">{project}</span>
                <span className="text-xs text-muted-foreground">{index + 2} open tasks</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </ComponentPreview>

      <ComponentPreview previewId="scroll-area-03" title="Horizontal Snap">
        <ScrollArea
          fadeEdges
          orientation="horizontal"
          role="region"
          aria-label="Recent workspace updates"
          className="h-36 w-full rounded-lg border [&_[data-slot=scroll-area-viewport]]:snap-x [&_[data-slot=scroll-area-viewport]]:snap-mandatory"
        >
          <div className="flex h-full w-max items-center gap-3 p-3">
            {["Billing overview", "Team permissions", "Inventory sync", "Customer notes"].map(
              (title, index) => (
                <article
                  key={title}
                  className="flex h-24 w-56 shrink-0 snap-start flex-col justify-between rounded-lg border bg-card p-3"
                >
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {index + 2} updates · {index + 1} hour{index === 0 ? "" : "s"} ago
                  </p>
                </article>
              )
            )}
          </div>
        </ScrollArea>
      </ComponentPreview>

      <ComponentPreview previewId="scroll-area-04" title="Both Scrollbars">
        <ScrollArea
          fadeEdges
          orientation="both"
          aria-label="Scrollable grid"
          className="h-56 w-full rounded-lg border"
        >
          <div className="grid w-[760px] grid-cols-6 gap-2 p-3">
            {Array.from({ length: 48 }, (_, index) => (
              <div key={index} className="rounded border p-3 text-sm">
                Cell {index + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </ComponentPreview>

      <ComponentPreview previewId="scroll-area-05" title="Fade Edges">
        <ScrollArea
          fadeEdges
          aria-label="Directory"
          className="h-56 w-full rounded-lg border"
        >
          <div className="p-2">
            {[..."ABCDEFGH"].map((letter) => (
              <section key={letter} className="mb-2">
                <h3 className="sticky top-0 bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">
                  {letter}
                </h3>
                {["lex Morgan", "very Chen"].map((name) => (
                  <p key={name} className="rounded-md px-2 py-2 text-sm">
                    {letter}{name}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </ScrollArea>
      </ComponentPreview>

      <ComponentPreview previewId="scroll-area-06" title="Scrollbar Gutter">
        <ScrollArea aria-label="Directory" className="h-56 w-full rounded-lg border">
          <ol className="divide-y px-3">
            {Array.from({ length: 20 }, (_, index) => (
              <li key={index} className="py-2 text-sm">
                {index + 1}. {rows[index % rows.length].name} · {rows[index % rows.length].action}
              </li>
            ))}
          </ol>
        </ScrollArea>
      </ComponentPreview>
    </>
  )
}
