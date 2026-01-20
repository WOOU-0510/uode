import { TitleBar } from "@/widgets/shell";
import cn from "classnames";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.scss";

type RootLayoutProps = {
  children: ReactNode;
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html lang="ko" className={cn(geistSans.className, geistMono.className)}>
      <body>
        <TitleBar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
