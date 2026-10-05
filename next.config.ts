import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: "/cart",
        destination: "/",
        permanent: true,
      },
      {
        source: "/work/custom-adult-dancewear",
        destination: "/work/photoshoot",
        permanent: true,
      },
      {
        source: "/work/project-two-ky966-af7wn",
        destination: "/work/costumes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
