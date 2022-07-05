import { AxiosError } from "axios";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { IS_DEV_RUNTIME } from "../../Contstants";
import { Block } from "../../models/block";
import { handleAddBlockByPath } from "../../tree/tree";
import { blockKeys } from "./fetchBlock";

async function createBlock(props: CreateBlockProps): Promise<CreateBlockProps> {
  if (IS_DEV_RUNTIME) {
    console.log(
      `API:createBlock {\nrootId: ${props.rootBlockId}\nblock: ${JSON.stringify(
        props.block
      )}`
    );
  }

  // TODO: API 구현 (create block by id)
  return props;
}

interface CreateBlockProps {
  rootBlockId: string;
  parentId: string | null;
  block: Block;
  csr: {
    dropPath: number[];
  };
}

export function useCreateBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreateBlockProps, AxiosError, CreateBlockProps, unknown>(
    createBlock,
    {
      onSuccess: async (props) => {
        const queryKey = blockKeys.detail(props.rootBlockId);

        const prevRootBlock = queryClient.getQueryData<Block>(
          queryKey
        ) as Block;

        const newRootBlock = handleAddBlockCSR(
          prevRootBlock,
          props.csr.dropPath,
          props.block
        );

        queryClient.setQueryData(queryKey, newRootBlock);
      },
    }
  );
}

const handleAddBlockCSR = (
  rootBlock: Block,
  dropPath: number[],
  newBlock: Block
) => {
  const newRootBlock = handleAddBlockByPath(rootBlock, dropPath, newBlock);
  return newRootBlock;
};
