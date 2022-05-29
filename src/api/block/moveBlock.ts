import { AxiosError } from "axios";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { IS_DEV_RUNTIME } from "../../Contstants";
import { Block } from "../../models/block";
import {
  handleAddBlockByPath,
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  IWithPath,
} from "../../tree/tree";
import { blockKeys } from "./fetchBlock";

async function moveBlock(props: MoveBlockProps): Promise<MoveBlockProps> {
  if (IS_DEV_RUNTIME) {
    console.log(
      `API:moveBlock {\nrootId: ${props.rootBlockId}\nblock: ${JSON.stringify(
        props.csr.block
      )}`
    );
  }

  // TODO: API 구현 (move block to target block by id)
  return props;
}

interface MoveBlockProps {
  rootBlockId: string;
  targetBlockId: string; // 이동시킬 부모의 id
  order: number; // 이동할 순서
  csr: {
    block: Block;
    splitDropzonePath: number[];
    itemPath: number[];
  };
}

export function useMoveBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation<MoveBlockProps, AxiosError, MoveBlockProps, unknown>(
    moveBlock,
    {
      onSuccess: async (props) => {
        const queryKey = blockKeys.detail(props.rootBlockId);

        const prevRootBlock = queryClient.getQueryData<Block>(
          queryKey
        ) as Block;

        const newRootBlock = handleMoveToPathCSR(
          prevRootBlock,
          props.csr.splitDropzonePath,
          { ...props.csr.block, path: props.csr.itemPath.join("-") }
        );

        queryClient.setQueryData(queryKey, newRootBlock);
      },
    }
  );
}

const handleMoveToPathCSR = (
  rootBlock: Block,
  splitDropzonePath: number[],
  { path: itemPath, ...item }: IWithPath<Block>
) => {
  const dropzonePath = splitDropzonePath.join("-");
  const splitItemPath = itemPath.split("-").map(Number);

  const dropzoneParentPath = splitDropzonePath.slice(0, -1).join("-");
  const itemParentPath = splitItemPath.slice(0, -1).join("-");

  // NO-OP case 는 Dropzone > useDrop > canDrop 에 있지만 만약을 위해 추가구현함

  // case: dropzone과 itempath가 동일한 경우 NO-OP
  if (dropzonePath === itemPath) {
    console.log("drag handle:: NOP-SAME_PATH");
    return;
  }

  // case: dropzone이 itempath 안에 존재하는 경우 NO-OP
  if (dropzonePath.startsWith(itemPath)) {
    console.log("drag handle:: NOP-DROP_INNER_ITEM");
    return;
  }

  // NO-OP case 종료

  // case: dropzone과 itemPath의 부모가 동일한 경우
  if (dropzoneParentPath === itemParentPath) {
    const newRootBlock = handleMoveWithinParent(
      rootBlock,
      splitDropzonePath,
      splitItemPath
    );

    return newRootBlock;
  }

  // case: dropzone과 itemPath의 부모가 다른 경우 {
  const newRootBlock = handleMoveToDifferentParent(
    rootBlock,
    splitDropzonePath,
    splitItemPath,
    item
  );

  return newRootBlock;
};
