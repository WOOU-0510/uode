import type * as React from "react";
import { PlaygroundShell } from "./components";

type PlaygroundRouteLayoutProps = {
  children: React.ReactNode;
};

const PlaygroundRouteLayout = (props: PlaygroundRouteLayoutProps) => {
  const { children } = props;
  return <PlaygroundShell>{children}</PlaygroundShell>;
};

export default PlaygroundRouteLayout;
