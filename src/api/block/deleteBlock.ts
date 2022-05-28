import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IS_DEV_RUNTIME } from "../../Contstants";
import { Block } from "../../models/block";
import { handleDeleteBlockByPath } from "../../tree/tree";
import { blockKeys } from "./fetchBlock";

async function deleteBlock(props: DeleteBlockProps): Promise<DeleteBlockProps> {
  if (IS_DEV_RUNTIME) {
    console.log(
      `API:deleteBlock {\nrootId: ${props.rootBlockId}\nblock: ${JSON.stringify(
        props.block
      )}`
    );
  }

  // TODO: API 구현 (delete block by id)
  return props;
}

interface DeleteBlockProps {
  rootBlockId: string;
  block: Block;
  csr: {
    thisPath: number[];
  };
}

export function useDeleteBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation<DeleteBlockProps, AxiosError, DeleteBlockProps, unknown>(
    deleteBlock,
    {
      onSuccess: async (props) => {
        const queryKey = blockKeys.detail(props.rootBlockId);

        const prevRootBlock = queryClient.getQueryData<Block>(
          queryKey
        ) as Block;

        const newRootBlock = handleDeleteBlockByPath(
          prevRootBlock,
          props.csr.thisPath,
          props.block,
          false
        );

        queryClient.setQueryData(queryKey, newRootBlock);
      },
    }
  );
}
