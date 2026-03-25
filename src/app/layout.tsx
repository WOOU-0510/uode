import { geistMono, geistSans } from "@/shared/assets/fonts";
import cn from "classnames";
import type { ReactNode } from "react";
import "@/shared/styles/globals.scss";

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html lang="ko" className={cn(geistSans.className, geistMono.className)}>
      <head></head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
