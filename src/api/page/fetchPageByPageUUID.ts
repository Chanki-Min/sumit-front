import axios from "axios";
import { QueryClient, useQuery, UseQueryOptions } from "react-query";
import { IS_DEV_RUNTIME, IS_SERVER_SIDE } from "../../Contstants";
import { Page } from "../../models/page";
import { pageMockData } from "./pageDataMock";

async function fetchPageById(pageId: string) {
  if (IS_DEV_RUNTIME) {
    console.log("API:fetchPageById, args:", pageId);
  }

  return (await axios.get<Page>(`/api/pages/${pageId}`)).data;
}

export const usePageByIdQuery = (pageId: string, enabled?: boolean) => {
  return useQuery<Page>(
    ["page", pageId],
    () => {
      return fetchPageById(pageId);
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled ?? true,
    }
  );
};

export const prefetchPageByIdQuerySsr = (
  queryClient: QueryClient,
  pageId: string,
  token: string
) => {
  if (!IS_SERVER_SIDE) {
    throw new Error("preFetching should be called within server-side only");
  }

  return queryClient.prefetchQuery(["page", pageId], async () => {
    const pageRes = await axios.get<Page>(
      `http://localhost:${8000}/pages/${pageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(pageRes.data);

    return pageRes.data;
  });
};
