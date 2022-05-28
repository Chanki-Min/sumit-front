import { AxiosError } from "axios";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { IS_DEV_RUNTIME } from "../../Contstants";
import { Block } from "../../models/block";
import { hadleUpdateChildByPath } from "../../tree/tree";
import { blockKeys } from "./fetchBlock";

async function updateBlock(props: UpdateBlockProps): Promise<UpdateBlockProps> {
  if (IS_DEV_RUNTIME) {
    console.log(
      `API:updateBlock {\nrootId: ${props.rootBlockId}\nblock: ${JSON.stringify(
        props.block
      )}`
    );
  }

  // TODO: API 구현 (update block by id)
  return props;
}

interface UpdateBlockProps {
  rootBlockId: string;
  block: Block;
  csr: {
    blockPath: number[];
  };
}

export function useUpdateBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation<UpdateBlockProps, AxiosError, UpdateBlockProps, unknown>(
    updateBlock,
    {
      onSuccess: async (props) => {
        const queryKey = blockKeys.detail(props.rootBlockId);

        const prevRootBlock = queryClient.getQueryData<Block>(
          queryKey
        ) as Block;

        const newRootBlock = hadleUpdateChildByPath(
          prevRootBlock,
          props.csr.blockPath,
          props.block
        );

        queryClient.setQueryData(queryKey, newRootBlock);
      },
    }
  );
}
