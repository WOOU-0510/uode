import { geistMono, geistSans } from "@/shared/assets/fonts";
import { GlobalPopoversLayout } from "@/widgets/popover/escape";
import cn from "classnames";
import type * as React from "react";
import "@/shared/styles/globals.scss";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html lang="ko" className={cn(geistSans.className, geistMono.className)}>
      <head></head>
      <body>
        <GlobalPopoversLayout>{children}</GlobalPopoversLayout>
      </body>
    </html>
  );
};

export default RootLayout;
