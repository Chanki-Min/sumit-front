import { Page } from "../../models/page";
import { v4 as uuidv4 } from "uuid";
import { IS_DEV_RUNTIME, IS_SERVER_SIDE } from "../../Contstants";
import { QueryClient, useQuery } from "react-query";
import { pageMockData } from "./pageDataMock";
import axios from "axios";

export async function fetchPages(token: string) {
  if (IS_DEV_RUNTIME) {
    console.log("API:fetchPages, args:");
  }

  return (await axios.get<Page[]>(`/api/pages`)).data;
}
