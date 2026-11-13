"use client";
import { ComponentPreview } from "@/components/docs/component-preview";

const weekVisitors = [
  { label: "Mon", desktop: 32, mobile: 20 },
  { label: "Tue", desktop: 41, mobile: 22 },
  { label: "Wed", desktop: 28, mobile: 15 },
  { label: "Thu", desktop: 36, mobile: 18 },
  { label: "Fri", desktop: 44, mobile: 25 },
  { label: "Sat", desktop: 18, mobile: 30 },
  { label: "Sun", desktop: 12, mobile: 16 },
];

const hourWeights = [0.35, 0.7, 1.15, 1.3, 0.95, 0.45];
const heatmapHours = ["00", "04", "08", "12", "16", "20"];

export function VisitorHeatmap() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cells = weekVisitors.flatMap((day, dayIndex) =>
    heatmapHours.map((hour, hourIndex) => ({
      day: days[dayIndex],
      hour,
      value: Math.round((day.desktop + day.mobile) * hourWeights[hourIndex]),
    })),
  );
  const max = Math.max(...cells.map((cell) => cell.value));
  const tone = (value: number) =>
    value / max < 0.35
      ? "bg-primary/15"
      : value / max < 0.6
        ? "bg-primary/40"
        : value / max < 0.8
          ? "bg-primary/70"
          : "bg-primary";
  return (
    <div className="grid w-full gap-3" role="img" aria-label="Visitors by weekday and hour">
      <div className="grid grid-cols-[2.5rem_repeat(6,minmax(0,1fr))] gap-1">
        <span />
        {heatmapHours.map((hour) => (
          <span key={hour} className="text-center text-[10px] text-muted-foreground">
            {hour}
          </span>
        ))}
        {days.map((day) => (
          <div key={day} className="contents">
            <span className="self-center text-[10px] text-muted-foreground">{day}</span>
            {cells
              .filter((cell) => cell.day === day)
              .map((cell) => (
                <span
                  key={cell.hour}
                  title={`${cell.day} ${cell.hour}:00, ${cell.value} visitors`}
                  className={`h-5 rounded-sm ${tone(cell.value)}`}
                />
              ))}
          </div>
        ))}
      </div>
      <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <span>Fewer</span>
        <span className="size-3 rounded-sm bg-primary/15" />
        <span className="size-3 rounded-sm bg-primary/40" />
        <span className="size-3 rounded-sm bg-primary/70" />
        <span className="size-3 rounded-sm bg-primary" />
        <span>More</span>
      </p>
    </div>
  );
}

export function VisitorStatusTracker() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const rows = [
    { label: "Desktop", goal: 30, values: weekVisitors.map((day) => day.desktop) },
    { label: "Mobile", goal: 20, values: weekVisitors.map((day) => day.mobile) },
  ];
  return (
    <div className="grid w-full gap-3" role="img" aria-label="Days that met the visitor goal">
      <div className="grid grid-cols-[4.5rem_repeat(7,minmax(0,1fr))] gap-1 text-center text-[10px] text-muted-foreground">
        <span />
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[4.5rem_repeat(7,minmax(0,1fr))] items-center gap-1">
          <span className="text-xs">{row.label}</span>
          {row.values.map((value, index) => (
            <span
              key={days[index]}
              title={`${row.label} ${days[index]}: ${value} visitors, goal ${row.goal}`}
              className={`h-2.5 rounded-full ${value >= row.goal ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      ))}
      <p className="flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-primary" />
          Met goal
        </span>
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-muted" />
          Below goal
        </span>
      </p>
    </div>
  );
}

export function HeatmapChartExamples() {
  return (
    <>
      <ComponentPreview title="Heatmap" layout="panel" density="chart">
        <VisitorHeatmap />
      </ComponentPreview>
      <ComponentPreview title="Cell values and color scale" layout="panel" density="chart">
        <VisitorStatusTracker />
      </ComponentPreview>
    </>
  );
}
