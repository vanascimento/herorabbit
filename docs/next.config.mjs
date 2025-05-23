import nextra from "nextra";
const isProd = process.env.NODE_ENV === "production";

const withNextra = nextra({
  search: true,
  defaultShowCopyCode: true,
});

export default withNextra({
  // ... Other Next.js config options
  // output: 'export'
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/herorabbit" : "",
  assetPrefix: isProd ? "/herorabbit/" : "",
  trailingSlash: true,
});
