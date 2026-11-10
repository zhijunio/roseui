"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/components/composite/component-preview";
import { Carousel, type CarouselApi } from "@/components/composite/carousel";

const slides = [
  { src: "/images/component-demos/abstract-01.svg", alt: "Creative workspace with a painted mural" },
  { src: "/images/component-demos/abstract-02.svg", alt: "Desk calendar and accessories" },
  { src: "/images/component-demos/abstract-03.svg", alt: "Colleagues working together" },
  { src: "/images/component-demos/abstract-04.svg", alt: "Team collaborating around a table" },
];

function Gallery({
  controls = true,
  indicators = true,
  align = "start",
  itemClassName,
  autoPlay = true,
  loop = false,
  navigationPlacement = "inside",
}: {
  controls?: boolean;
  indicators?: boolean;
  align?: "start" | "center";
  itemClassName?: string;
  autoPlay?: boolean;
  loop?: boolean;
  navigationPlacement?: "inside" | "outside";
}) {
  return <Carousel
      aria-label="Creative work image gallery"
      showArrows={controls}
      showDots={indicators}
      align={align}
      itemClassName={itemClassName}
      autoPlay={autoPlay}
      loop={loop}
      navigationPlacement={navigationPlacement}
    >
      {slides.map((slide) => (
        <div key={slide.src} className="relative aspect-[487/297] overflow-hidden rounded-lg">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ))}
    </Carousel>;
}

function CarouselApiExample() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid w-full gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" disabled={!api || activeIndex === 0} onClick={() => api?.scrollPrevious()}>Previous</Button>
        <Button size="sm" variant="outline" disabled={!api || activeIndex >= (api?.getSlideCount() ?? 0) - 1} onClick={() => api?.scrollNext()}>Next</Button>
        <Button size="sm" variant="ghost" disabled={!api} onClick={() => api?.scrollTo(0)}>Go to first</Button>
        <span aria-live="polite" className="text-xs tabular-nums text-muted-foreground">Slide {activeIndex + 1} of {api?.getSlideCount() ?? slides.length}</span>
      </div>
      <Carousel aria-label="Programmatically controlled project gallery" autoPlay={false} onApiReady={setApi} onActiveIndexChange={setActiveIndex}>
        {slides.map((slide) => (
          <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg">
            <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export function CarouselExamples() {
  return (
    <>
      <ComponentPreview previewId="carousel-01" title="Controls" layout="stack" exampleLabels={["No controls", "Arrows only", "Dots only", "Arrows and dots", "Captioned dots"]}>
      <div className="min-w-0 w-full"><Gallery controls={false} indicators={false} /></div>
      <div className="min-w-0 w-full"><Gallery indicators={false} /></div>
      <div className="min-w-0 w-full"><Gallery controls={false} /></div>
      <div className="min-w-0 w-full"><Gallery /></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Platform release highlights" autoPlay={false} showArrows={false} showDots>
                {slides.map((slide, index) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" /><div className="absolute inset-x-5 bottom-10 text-white"><p className="text-xs font-medium uppercase tracking-wide">Update {index + 1}</p><p className="mt-1 text-lg font-semibold">{slide.alt}</p></div></div>)}
              </Carousel></div>
      </ComponentPreview>
      <ComponentPreview previewId="carousel-02" title="Layout" layout="stack" exampleLabels={["Centered cards", "Vertical", "Responsive cards", "Arrows outside the slides", "Infinite loop"]}>
      <div className="min-w-0 w-full"><Gallery align="center" itemClassName="w-[78%] sm:w-[58%]" autoPlay={false} /></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Vertical project gallery" orientation="vertical" autoPlay={false} itemClassName="h-52 w-full">
                {slides.map((slide) => <div key={slide.src} className="relative h-full overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>)}
              </Carousel></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Responsive project cards" autoPlay={false} gap={24} itemClassName="w-[84%] sm:w-[47%] xl:w-[31%]">
                {slides.map((slide) => <div key={slide.src} className="overflow-hidden rounded-lg border bg-card"><div className="relative aspect-[4/3]"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 80vw, 31vw" className="object-cover" /></div><p className="p-3 text-sm font-medium">{slide.alt}</p></div>)}
              </Carousel></div>
      <div className="min-w-0 w-full"><Gallery autoPlay={false} navigationPlacement="outside" /></div>
      <div className="min-w-0 w-full"><Gallery autoPlay={false} loop /></div>
      </ComponentPreview>
      <ComponentPreview previewId="carousel-03" title="Programmatic Navigation" layout="wide">
        <CarouselApiExample />
      </ComponentPreview>
      <ComponentPreview previewId="carousel-04" title="Media" span={2} layout="stack" exampleLabels={["Autoplay", "Thumbnail rail", "Overlay thumbnails"]}>
      <div className="min-w-0 w-full"><Carousel aria-label="Autoplay project gallery" autoPlay autoPlayInterval={3500} loop showDots>
                {slides.map((slide) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>)}
              </Carousel></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Release highlights" autoPlay={false} showDots={false} thumbnails={slides.map((slide) => <span key={slide.src} className="relative block size-12 sm:size-16"><Image src={slide.src} alt="" fill sizes="64px" className="object-cover" /></span>)}>
                {slides.map((slide, index) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><div className="absolute inset-x-4 bottom-4 text-white"><p className="text-xs font-medium uppercase tracking-wide">Release highlight {index + 1}</p><p className="mt-1 text-lg font-semibold">{slide.alt}</p></div></div>)}
              </Carousel></div>
      <div className="min-w-0 w-full"><Carousel aria-label="Team showcase" autoPlay={false} showDots={false} thumbnailPosition="overlay" thumbnails={slides.map((slide) => <span key={slide.src} className="relative block size-10 sm:size-14"><Image src={slide.src} alt="" fill sizes="56px" className="object-cover" /></span>)}>
                {slides.map((slide) => <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>)}
              </Carousel></div>
      </ComponentPreview>
    </>
  );
}
