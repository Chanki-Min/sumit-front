import { Page } from "../../models/page";
import { v4 as uuidv4 } from "uuid";
import { IS_DEV_RUNTIME, IS_SERVER_SIDE } from "../../Contstants";
import { QueryClient, useQuery } from "react-query";
import { pageMockData } from "./pageDataMock";

export function fetchPages<B extends boolean>(
  withSlides: B
): B extends true ? Promise<Page[]> : Promise<Omit<Page, "slides">[]>;

export async function fetchPages(withSlides: boolean) {
  if (IS_DEV_RUNTIME) {
    console.log("API:fetchPages, args:", withSlides);
  }

  if (withSlides === false) {
    return pageMockData;
  }

  return pageMockData.map(omitSlide);
}

async function fetchPageById(pageId: string) {
  if (IS_DEV_RUNTIME) {
    console.log("API:fetchPageById, args:", pageId);
  }

  const dataOrUndefined = pageMockData.find((p) => p.uuid === pageId);
  if (typeof dataOrUndefined === "undefined") {
    throw new Error(`pageId: ${pageId} not found`);
  }

  return dataOrUndefined;
}

const omitSlide = (md: Page): Omit<Page, "slides"> => {
  const { slides, ...rest } = md;
  return rest;
};

export const usePagesQuery = (withSlides: boolean) => {
  return useQuery<Page[] | Omit<Page, "slides">[]>(
    ["page", withSlides],
    () => {
      if (withSlides) {
        return fetchPages(withSlides) as Promise<Page[]>;
      }

      return fetchPages(withSlides);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const prefetchPagesQuerySsr = (
  queryClient: QueryClient,
  withSlides: boolean
) => {
  if (!IS_SERVER_SIDE) {
    throw new Error("preFetching should be called within server-side only");
  }

  return queryClient.prefetchQuery(["page", withSlides], () => {
    return fetchPages(withSlides);
  });
};
