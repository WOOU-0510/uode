import type { ReactNode } from "react";
import { PlaygroundShell } from "./components";

type PlaygroundRouteLayoutProps = {
  children: ReactNode;
};

const PlaygroundRouteLayout = (props: PlaygroundRouteLayoutProps) => {
  const { children } = props;
  return <PlaygroundShell>{children}</PlaygroundShell>;
};

export default PlaygroundRouteLayout;
