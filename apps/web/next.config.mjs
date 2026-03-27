const isProd = process.env.NODE_ENV === "production";
const internalHost = process.env.TAURI_DEV_HOST || "localhost";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tauri는 서버 기반 배포를 지원하지 않아서 정적 export(SSG)로 빌드합니다.
  // 참고: https://v2.tauri.app/ko/start/frontend/nextjs/
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // dev에서 Tauri WebView가 번들/정적 자산을 올바르게 가져오도록 assetPrefix를 설정합니다.
  assetPrefix: isProd ? undefined : `http://${internalHost}:1420`,
  // Next.js React Compiler 활성화
  // 참고: https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
  reactCompiler: true,
  transpilePackages: ["@uode/base-ui-core", "@uode/base-ui-react"],
  typedRoutes: true,
  logging: {
    browserToTerminal: true,
    // 'error' — errors only (default)
    // 'warn'  — warnings and errors
    // true    — all console output
    // false   — disabled
  },
  experimental: {
    useLightningcss: true, // default, ignored on Turbopack
    viewTransition: true,
  },
  devIndicators: false,
};

export default nextConfig;
