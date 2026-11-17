export type ColorFormat = "hex" | "rgb" | "hsl" | "hsb";
export type ColorChannel = "hue" | "saturation" | "lightness" | "brightness" | "red" | "green" | "blue" | "alpha";

export function getColorChannelMax(channel: ColorChannel) {
  if (channel === "hue") return 360;
  if (channel === "red" || channel === "green" || channel === "blue") return 255;
  if (channel === "alpha") return 1;
  return 100;
}

type Rgb = { r: number; g: number; b: number; a: number };
type Hsl = { hue: number; saturation: number; lightness: number };
type Hsv = { hue: number; saturation: number; brightness: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function hslToRgb(hue: number, saturation: number, lightness: number, alpha = 1): Rgb {
  const h = (((hue % 360) + 360) % 360) / 360;
  const s = clamp(saturation, 0, 100) / 100;
  const l = clamp(lightness, 0, 100) / 100;
  const channel = (n: number) => {
    const k = (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return { r: channel(0), g: channel(8), b: channel(4), a: clamp(alpha, 0, 1) };
}

function hsvToRgb(hue: number, saturation: number, brightness: number, alpha = 1): Rgb {
  const h = (((hue % 360) + 360) % 360) / 60;
  const s = clamp(saturation, 0, 100) / 100;
  const v = clamp(brightness, 0, 100) / 100;
  const chroma = v * s;
  const x = chroma * (1 - Math.abs((h % 2) - 1));
  const m = v - chroma;
  const sector = Math.floor(h);
  const channels =
    sector === 0
      ? [chroma, x, 0]
      : sector === 1
        ? [x, chroma, 0]
        : sector === 2
          ? [0, chroma, x]
          : sector === 3
            ? [0, x, chroma]
            : sector === 4
              ? [x, 0, chroma]
              : [chroma, 0, x];
  return {
    r: Math.round((channels[0] + m) * 255),
    g: Math.round((channels[1] + m) * 255),
    b: Math.round((channels[2] + m) * 255),
    a: clamp(alpha, 0, 1),
  };
}

function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let hue = 0;
  if (delta) {
    if (max === red) hue = ((green - blue) / delta) % 6;
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
  }
  hue = (hue * 60 + 360) % 360;
  const lightness = (max + min) / 2;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
  return { hue, saturation: saturation * 100, lightness: lightness * 100 };
}

function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let hue = 0;
  if (delta) {
    if (max === red) hue = ((green - blue) / delta) % 6;
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
  }
  hue = (hue * 60 + 360) % 360;
  return { hue, saturation: max === 0 ? 0 : (delta / max) * 100, brightness: max * 100 };
}

function parseRgb(input: string): Rgb {
  const value = input.trim().toLowerCase();
  const hex = /^#([\da-f]{3,8})$/i.exec(value);
  if (hex) {
    const raw = hex[1];
    const expanded = raw.length === 3 || raw.length === 4 ? [...raw].map((part) => part + part).join("") : raw;
    if (expanded.length !== 6 && expanded.length !== 8) throw new Error(`Unsupported color: ${input}`);
    return {
      r: Number.parseInt(expanded.slice(0, 2), 16),
      g: Number.parseInt(expanded.slice(2, 4), 16),
      b: Number.parseInt(expanded.slice(4, 6), 16),
      a: expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1,
    };
  }
  const rgb = /^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/.exec(value);
  if (rgb)
    return {
      r: clamp(Number(rgb[1]), 0, 255),
      g: clamp(Number(rgb[2]), 0, 255),
      b: clamp(Number(rgb[3]), 0, 255),
      a: rgb[4] ? clamp(Number.parseFloat(rgb[4]) / (rgb[4].endsWith("%") ? 100 : 1), 0, 1) : 1,
    };
  const hsl = /^hsla?\(\s*([\d.-]+)(?:deg)?\s*[, ]\s*([\d.]+)%\s*[, ]\s*([\d.]+)%(?:\s*[,/]\s*([\d.]+))?\s*\)$/.exec(
    value,
  );
  if (hsl) return hslToRgb(Number(hsl[1]), Number(hsl[2]), Number(hsl[3]), hsl[4] ? Number(hsl[4]) : 1);
  const hsb = /^hsb\(\s*([\d.-]+)(?:deg)?\s*[, ]\s*([\d.]+)%\s*[, ]\s*([\d.]+)%(?:\s*[,/]\s*([\d.]+))?\s*\)$/.exec(
    value,
  );
  if (hsb) return hsvToRgb(Number(hsb[1]), Number(hsb[2]), Number(hsb[3]), hsb[4] ? Number(hsb[4]) : 1);
  throw new Error(`Unsupported color: ${input}`);
}

function serializeRgb(color: Rgb) {
  return color.a < 1
    ? `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a})`
    : `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
}

export class Color {
  private readonly rgb: Rgb;

  constructor(value: string) {
    this.rgb = parseRgb(value);
  }

  toString(format: ColorFormat = "rgb"): string {
    const { r, g, b, a } = this.rgb;
    if (format === "hex") {
      const channels = [r, g, b, ...(a < 1 ? [a * 255] : [])];
      return `#${channels.map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;
    }
    if (format === "rgb") return serializeRgb(this.rgb);
    if (format === "hsb") {
      const channels = rgbToHsv(this.rgb);
      const alpha = a < 1 ? ` / ${a}` : "";
      return `hsb(${Math.round(channels.hue)} ${Math.round(channels.saturation)}% ${Math.round(channels.brightness)}%${alpha})`;
    }
    const channels = rgbToHsl(this.rgb);
    const alpha = a < 1 ? ` / ${a}` : "";
    return `hsl(${Math.round(channels.hue)} ${Math.round(channels.saturation)}% ${Math.round(channels.lightness)}%${alpha})`;
  }

  toFormat(format: ColorFormat) {
    const hsl = rgbToHsl(this.rgb);
    const hsv = rgbToHsv(this.rgb);
    const values: Record<ColorChannel, number> = {
      hue: format === "hsb" ? hsv.hue : hsl.hue,
      saturation: format === "hsb" ? hsv.saturation : hsl.saturation,
      lightness: hsl.lightness,
      brightness: hsv.brightness,
      red: this.rgb.r,
      green: this.rgb.g,
      blue: this.rgb.b,
      alpha: this.rgb.a,
    };
    return { getChannelValue: (channel: ColorChannel) => values[channel] };
  }

  withChannel(channel: ColorChannel, value: number, format: ColorFormat = "hsl") {
    if (channel === "red") return new Color(serializeRgb({ ...this.rgb, r: clamp(value, 0, 255) }));
    if (channel === "green") return new Color(serializeRgb({ ...this.rgb, g: clamp(value, 0, 255) }));
    if (channel === "blue") return new Color(serializeRgb({ ...this.rgb, b: clamp(value, 0, 255) }));
    if (channel === "alpha") return new Color(serializeRgb({ ...this.rgb, a: clamp(value, 0, 1) }));

    const useHsv = channel === "brightness" || (format === "hsb" && (channel === "hue" || channel === "saturation"));
    if (useHsv) {
      const current = rgbToHsv(this.rgb);
      const hue = channel === "hue" ? value : current.hue;
      const saturation = channel === "saturation" ? value : current.saturation;
      const brightness = channel === "brightness" ? value : current.brightness;
      return new Color(serializeRgb(hsvToRgb(hue, saturation, brightness, this.rgb.a)));
    }

    const current = rgbToHsl(this.rgb);
    const hue = channel === "hue" ? value : current.hue;
    const saturation = channel === "saturation" ? value : current.saturation;
    const lightness = channel === "lightness" ? value : current.lightness;
    return new Color(serializeRgb(hslToRgb(hue, saturation, lightness, this.rgb.a)));
  }
}

export function parseColor(value: string) {
  return new Color(value);
}
