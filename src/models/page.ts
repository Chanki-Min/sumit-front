import { setRevalidateHeaders } from "next/dist/server/send-payload";
import Slide from "./Slide";

export interface Page {
  uuid: number;

  user_uuid: string;

  title: string;

  description: string;

  hashtags: string[];

  share: boolean;

  createAt: number; // unix timestamp

  updateAt: number; // unix timestamp

  slides: Slide[];
}

export type OmittedPage = Omit<
  Page,
  "user_uuid" | "createAt" | "updateAt" | "slides"
>;

/**
 * TS 의 Omit 타입으로 원본 타입을 캐스팅해도, 필드는 그대로 남아 있기 때문에,
 * 명시적으로 해당 필드를 삭제하는 메소드를 구현합니다.
 *
 * @param page
 * @returns
 */
export function transformPageToOmittedPage(
  page: Page | Omit<Page, "slides">
): OmittedPage {
  const { user_uuid, createAt, updateAt, ...rest } = page;

  if ("slides" in rest) {
    delete rest.slides;
  }

  return rest;
}

export type PagePartial = Partial<Page>;
