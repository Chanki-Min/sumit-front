import { QueryClient, useQuery, UseQueryOptions } from "react-query";
import { IS_DEV_RUNTIME, IS_SERVER_SIDE } from "../../Contstants";
import { Page } from "../../models/page";
import { pageMockData } from "./pageDataMock";

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

export const usePageByIdQuery = (pageId: string, enabled?: boolean) => {
  return useQuery<Page>(
    ["page", pageId],
    () => {
      return fetchPageById(pageId);
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const prefetchPageByIdQuerySsr = (
  queryClient: QueryClient,
  pageId: string
) => {
  if (!IS_SERVER_SIDE) {
    throw new Error("preFetching should be called within server-side only");
  }

  return queryClient.prefetchQuery(["page", pageId], () => {
    return fetchPageById(pageId);
  });
};
