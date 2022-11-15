// global.d.ts
declare global {
  interface Window {
    __SUBMIT__GLOBAL_FOCUS: string;
  }

  interface Selection {
    modify(s: string, t: string, u: string): void;
  }
}

export const __SUBMIT__GLOBAL_FOCUS = window.__SUBMIT__GLOBAL_FOCUS;
