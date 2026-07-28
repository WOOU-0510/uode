import type * as React from "react";

export type SwitchProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "role" | "type"
>;

export type SwitchTrackProps = React.ComponentPropsWithRef<"span">;
export type SwitchThumbProps = React.ComponentPropsWithRef<"span">;

const SwitchControl = (props: SwitchProps) => (
  // biome-ignore lint/a11y/useAriaPropsForRole: native checkbox의 checked 상태가 switch 접근성 상태로 노출됩니다.
  <input {...props} type="checkbox" role="switch" data-part="control" />
);

const SwitchTrack = (props: SwitchTrackProps) => {
  const { ...rest } = props;
  return <span {...rest} aria-hidden="true" data-part="track" />;
};

const SwitchThumb = (props: SwitchThumbProps) => {
  const { ...rest } = props;
  return <span {...rest} aria-hidden="true" data-part="thumb" />;
};

export type SwitchCompound = typeof SwitchControl & {
  readonly Track: typeof SwitchTrack;
  readonly Thumb: typeof SwitchThumb;
};

export const Switch: SwitchCompound = Object.assign(SwitchControl, {
  Track: SwitchTrack,
  Thumb: SwitchThumb,
});
