import type * as React from "react";
type FolderSharpIconProps = React.SVGProps<SVGSVGElement>;

const FolderSharpIcon = (props: FolderSharpIconProps) => {
  const { ...svgProps } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...svgProps}
    >
      <path
        data-icon-part="path"
        d="M10 4H2V20H22V6H12L10 4Z"
        fill="currentColor"
      />
    </svg>
  );
};
export default FolderSharpIcon;
