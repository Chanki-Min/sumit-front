import axios from "axios";
import { useQuery } from "react-query";
import {
  IS_DEV_RUNTIME,
  IS_SERVER_SIDE,
  LOCAL_STORAGE_KEYS,
} from "../../Contstants";
import { Block } from "../../models/block";
import { rootBlockMock } from "../page/pageDataMock";

async function fetchBlockById(blockId: string): Promise<Block> {
  // if (IS_DEV_RUNTIME) {
  //   console.log("API:fetchBlockById, args:", blockId);
  // }
  // // TODO: API 구현 (fetch block by id)
  // if (!IS_SERVER_SIDE) {
  //   const ls_data = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TEMP_STORE);
  //   if (ls_data === null) {
  //     return rootBlockMock;
  //   }

  //   const tree = JSON.parse(ls_data);
  //   return tree;
  // }
  // return rootBlockMock;

  const blocks = (await axios.get(`/api/blocks/tree/${blockId}`)).data;

  console.log(JSON.stringify(blocks), blockId);

  return blocks?.blockJson ?? blocks;
}

// react-query key 관리용 객체
export const blockKeys = {
  all: ["block"] as const,
  detail: (blockId: string) => [...blockKeys.all, { uuid: blockId }] as const,
} as const;

export function useBlockByIdQuery(blockId: string, enabled?: boolean) {
  return useQuery(
    blockKeys.detail(blockId),
    () => {
      return fetchBlockById(blockId);
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
    }
  );
}
