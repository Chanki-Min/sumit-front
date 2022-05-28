import { useQuery } from "react-query";
import { IS_DEV_RUNTIME } from "../../Contstants";
import { Block } from "../../models/block";
import { rootBlockMock } from "../page/pageDataMock";

async function fetchBlockById(blockId: string): Promise<Block> {
  if (IS_DEV_RUNTIME) {
    console.log("API:fetchBlockById, args:", blockId);
  }
  // TODO: API 구현 (fetch block by id)
  return rootBlockMock;
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
