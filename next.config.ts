import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/docs/components/buttons/action-bar",
        destination: "/docs/components/controls/action-bar",
        permanent: true,
      },
      {
        source: "/docs/components/buttons/segmented-control",
        destination: "/docs/components/controls/segmented-control",
        permanent: true,
      },
      {
        source: "/docs/components/buttons/emoji-reaction-button",
        destination: "/docs/components/collections/reactions",
        permanent: true,
      },
      {
        source: "/docs/components/layouts/typography",
        destination: "/docs/components/surfaces/typography",
        permanent: true,
      },
      {
        source: "/docs/components/layouts/mega-menu-morph",
        destination: "/docs/components/navigation/navigation-menu",
        permanent: true,
      },
      {
        source: "/docs/components/navigation/mega-menu-morph",
        destination: "/docs/components/navigation/navigation-menu",
        permanent: true,
      },
      {
        source: "/docs/components/overlays/preview",
        destination: "/docs/components/overlays/hover-card",
        permanent: true,
      },
      {
        source: "/docs/components/buttons/file-trigger",
        destination: "/docs/components/drag-and-drop/file-trigger",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
