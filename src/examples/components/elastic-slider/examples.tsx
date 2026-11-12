"use client";

import * as React from "react";

import { IconVolume, IconVolumeOff } from "@tabler/icons-react";

import { ElasticSlider } from "@/components/ui/elastic-slider";
import { ComponentPreview } from "@/examples/component-preview";

export function ElasticSliderExamples() {
  const [volume, setVolume] = React.useState(62);
  const [playback, setPlayback] = React.useState(1);
  return (
    <>
      <ComponentPreview title="Audio level" layout="fullStack">
        <ElasticSlider
          label="Preview volume"
          value={volume}
          onValueChange={setVolume}
          onValueCommit={setVolume}
          formatValue={(value) => `${value}%`}
          marks={[0, 25, 50, 75, 100]}
          startIcon={<IconVolumeOff size={16} />}
          endIcon={<IconVolume size={18} />}
        />
      </ComponentPreview>
      <ComponentPreview title="Playback speed" layout="fullStack">
        <ElasticSlider
          label="Playback speed"
          min={0.5}
          max={2}
          step={0.1}
          value={playback}
          onValueChange={setPlayback}
          formatValue={(value) => `${value.toFixed(1)}×`}
          marks={[0.5, 1, 1.5, 2]}
        />
        <p className="text-xs text-muted-foreground">
          Use the marked values as references; intermediate speeds remain available.
        </p>
      </ComponentPreview>
    </>
  );
}
