import type { NextConfig } from "next";

const horizonPages = ["administration", "entretien", "services-generaux", "realisations", "a-propos", "soumission"];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/groupe-nouvelle-horizon", destination: "/gnh-reference/index.html" },
        ...horizonPages.map((page) => ({
          source: `/groupe-nouvelle-horizon/${page}`,
          destination: `/gnh-reference/${page}.html`,
        })),
      ],
    };
  },
};

export default nextConfig;
