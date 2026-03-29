import * as React from "react";
type ArrowRangeIconProps = React.SVGProps<SVGSVGElement>;

const ArrowRangeIcon = (props: ArrowRangeIconProps) => {
  const { ...svgProps } = props;
  return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...svgProps}><mask id="mask0_1_37" style={{
    maskType: "alpha"
  }} maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}><rect width={24} height={24} fill="currentColor" /></mask><g mask="url(#mask0_1_37)"><path d="M7 17L2 12L7 7L8.4 8.4L5.825 11H18.175L15.6 8.4L17 7L22 12L17 17L15.6 15.6L18.175 13H5.825L8.4 15.6L7 17Z" fill="currentColor" /></g></svg>;
};
export default ArrowRangeIcon;