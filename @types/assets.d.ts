import { IJSONObject } from '../src/types/types';

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: IJSONObject;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}
