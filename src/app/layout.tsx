import type { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};
const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
