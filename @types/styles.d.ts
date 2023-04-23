declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { className?: string }
  >;
  const src: string;
  export default src;
}

