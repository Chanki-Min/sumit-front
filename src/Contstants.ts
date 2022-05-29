export const PLACEHOLDER = '명령어 사용시 "/"를 입력하세요' as const;

export const IS_SERVER_SIDE = typeof window === "undefined";

export const IS_DEV_RUNTIME = process.env.NODE_ENV === "development";

export const LOCAL_STORAGE_KEYS = {
  TEMP_STORE: "temporary_store",
} as const;
