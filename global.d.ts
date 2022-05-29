// global.d.ts
declare global {
  interface Window {
    __SUBMIT__GLOBAL_FOCUS: string;
  }
}

export const __SUBMIT__GLOBAL_FOCUS = window.__SUBMIT__GLOBAL_FOCUS;
