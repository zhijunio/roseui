"use client";

import { useState } from "react";

import Image from "next/image";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Carousel, type CarouselApi } from "@/components/roseui/carousel";
import { Button } from "@/components/ui/button";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    alt: "Creative workspace with a painted mural",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    alt: "Desk calendar and accessories",
  },
  {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
    alt: "Colleagues working together",
  },
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    alt: "Team collaborating around a table",
  },
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
  return (
    <Carousel
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
            unoptimized
            className="object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
}

function CarouselApiExample() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid w-full gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" disabled={!api || activeIndex === 0} onClick={() => api?.scrollPrevious()}>
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={!api || activeIndex >= (api?.getSlideCount() ?? 0) - 1}
          onClick={() => api?.scrollNext()}
        >
          Next
        </Button>
        <Button size="sm" variant="ghost" disabled={!api} onClick={() => api?.scrollTo(0)}>
          Go to first
        </Button>
        <span aria-live="polite" className="text-xs tabular-nums text-muted-foreground">
          Slide {activeIndex + 1} of {api?.getSlideCount() ?? slides.length}
        </span>
      </div>
      <Carousel
        aria-label="Programmatically controlled project gallery"
        autoPlay={false}
        onApiReady={setApi}
        onActiveIndexChange={setActiveIndex}
      >
        {slides.map((slide) => (
          <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
              className="object-cover"
            />
          </div>
        ))}
      </Carousel>
      <div className="flex flex-wrap items-center justify-center gap-1" role="group" aria-label="Choose a slide">
        {slides.map((slide, index) => (
          <Button
            key={slide.src}
            type="button"
            size="icon-sm"
            variant={activeIndex === index ? "secondary" : "ghost"}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            disabled={!api}
            onClick={() => api?.scrollTo(index)}
            className="size-7 text-xs tabular-nums"
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}

function CardCarousel() {
  const cards = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <Carousel
      aria-label="Featured collections"
      autoPlay={false}
      align="center"
      loop
      gap={12}
      itemClassName="w-[48%] sm:w-[31%]"
      className="border-0"
    >
      {cards.map((number) => (
        <article
          key={number}
          className="grid aspect-square place-items-center rounded-xl border bg-card text-card-foreground shadow-sm"
        >
          <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
            {number}
          </div>
        </article>
      ))}
    </Carousel>
  );
}

export function CarouselExamples() {
  return (
    <>
      <ComponentPreview
        title="Controls"
        layout="stack"
        exampleLabels={["No controls", "Arrows only", "Dots only", "Arrows and dots", "Captioned dots"]}
      >
        <div className="min-w-0 w-full">
          <Gallery controls={false} indicators={false} />
        </div>
        <div className="min-w-0 w-full">
          <Gallery indicators={false} />
        </div>
        <div className="min-w-0 w-full">
          <Gallery controls={false} />
        </div>
        <div className="min-w-0 w-full">
          <Gallery />
        </div>
        <div className="min-w-0 w-full">
          <Carousel aria-label="Platform release highlights" autoPlay={false} showArrows={false} showDots>
            {slides.map((slide, index) => (
              <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-10 text-white">
                  <p className="text-xs font-medium uppercase tracking-wide">Update {index + 1}</p>
                  <p className="mt-1 text-lg font-semibold">{slide.alt}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </ComponentPreview>
      <ComponentPreview
        title="Layout"
        layout="stack"
        exampleLabels={["Centered cards", "Vertical", "Responsive cards", "Arrows outside the slides", "Infinite loop"]}
      >
        <div className="min-w-0 w-full">
          <Gallery align="center" itemClassName="w-[78%] sm:w-[58%]" autoPlay={false} />
        </div>
        <div className="min-w-0 w-full">
          <Carousel
            aria-label="Vertical project gallery"
            orientation="vertical"
            autoPlay={false}
            itemClassName="h-52 w-full"
          >
            {slides.map((slide) => (
              <div key={slide.src} className="relative h-full overflow-hidden rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="min-w-0 w-full">
          <Carousel
            aria-label="Responsive project cards"
            autoPlay={false}
            gap={24}
            itemClassName="w-[84%] sm:w-[47%] xl:w-[31%]"
          >
            {slides.map((slide) => (
              <div key={slide.src} className="overflow-hidden rounded-lg border bg-card">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 31vw"
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <p className="p-3 text-sm font-medium">{slide.alt}</p>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="min-w-0 w-full">
          <Gallery autoPlay={false} navigationPlacement="outside" />
        </div>
        <div className="min-w-0 w-full">
          <Gallery autoPlay={false} loop />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Programmatic Navigation" layout="wide">
        <CarouselApiExample />
      </ComponentPreview>
      <ComponentPreview title="Centered Card Carousel" layout="wide">
        <CardCarousel />
      </ComponentPreview>
      <ComponentPreview
        title="Media"
        span={2}
        layout="stack"
        exampleLabels={["Autoplay", "Thumbnail rail", "Overlay thumbnails"]}
      >
        <div className="min-w-0 w-full">
          <Carousel aria-label="Autoplay project gallery" autoPlay autoPlayInterval={3500} loop showDots>
            {slides.map((slide) => (
              <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="min-w-0 w-full">
          <Carousel
            aria-label="Release highlights"
            autoPlay={false}
            showDots={false}
            thumbnails={slides.map((slide) => (
              <span key={slide.src} className="relative block size-12 sm:size-16">
                <Image src={slide.src} alt="" fill sizes="64px" unoptimized className="object-cover" />
              </span>
            ))}
          >
            {slides.map((slide, index) => (
              <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <p className="text-xs font-medium uppercase tracking-wide">Release highlight {index + 1}</p>
                  <p className="mt-1 text-lg font-semibold">{slide.alt}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="min-w-0 w-full">
          <Carousel
            aria-label="Team showcase"
            autoPlay={false}
            showDots={false}
            thumbnailPosition="overlay"
            thumbnails={slides.map((slide) => (
              <span key={slide.src} className="relative block size-10 sm:size-14">
                <Image src={slide.src} alt="" fill sizes="56px" unoptimized className="object-cover" />
              </span>
            ))}
          >
            {slides.map((slide) => (
              <div key={slide.src} className="relative aspect-[16/8] overflow-hidden rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </ComponentPreview>
    </>
  );
}
