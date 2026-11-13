import type { NextConfig } from "next";

const imageRemotePatterns: NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/photo-1497366754035-f200968a6e72",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/photo-1497366811353-6870744d04b2",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/photo-1521737711867-e3b97375f902",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/photo-1524758631624-e2822e304c36",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/photo-1615985250204-b48c0936d4fc",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageRemotePatterns,
  },
};

export default nextConfig;
