import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IS_DEV_RUNTIME } from "../../Contstants";
import { Block } from "../../models/block";
import {
  handleMoveToDropzoneWithUnderSiblingToItemChild,
  handleMoveToParentLastChildWithFlat,
} from "../../tree/tree";
import { blockKeys } from "./fetchBlock";

async function indentBlock(props: IndentBlockProps): Promise<IndentBlockProps> {
  if (IS_DEV_RUNTIME) {
    console.log(
      `API:indenteBlock {\nrootId: ${
        props.rootBlockId
      }\nblock: ${JSON.stringify(props.block)}`
    );
  }

  // TODO: API 구현 (delete block by id)
  return props;
}

interface IndentBlockProps {
  rootBlockId: string;
  block: Block;
  directon: "left" | "right";
  csr: {
    splitParentPath: number[];
    splitItemPath: number[];
  };
}

export function useIndentBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation<IndentBlockProps, AxiosError, IndentBlockProps, unknown>(
    indentBlock,
    {
      onSuccess: async (props) => {
        const queryKey = blockKeys.detail(props.rootBlockId);

        const prevRootBlock = queryClient.getQueryData<Block>(
          queryKey
        ) as Block;

        const newRootBlock = handleIndentationCSR(
          prevRootBlock,
          props.csr.splitParentPath,
          props.csr.splitItemPath,
          props.block,
          props.directon
        );

        queryClient.setQueryData(queryKey, newRootBlock);
      },
    }
  );
}

const handleIndentationCSR = (
  rootBlock: Block,
  splitParentPath: number[],
  splitItemPath: number[],
  item: Block,
  directon: "left" | "right"
) => {
  if (directon === "right") {
    const [newRootBlock, droppedPath] = handleMoveToParentLastChildWithFlat(
      rootBlock,
      splitParentPath,
      splitItemPath,
      item
    );
    //   nextFocusPathOrNull.current = droppedPath;
    return newRootBlock;
  } else {
    // left tab의 경우, 나를 dropzone에 떨구고, 내 형제들을 모두 내 자식으로 편입시킨다
    const dropPath = Array.from(splitParentPath);
    //  예외 상항 (더 이상 왼쪽으로 이동할 수 없는 경우) 무시한다
    if (dropPath.length < 2 || dropPath[0] === 1) {
      return;
    }
    const nextRootBlock = handleMoveToDropzoneWithUnderSiblingToItemChild(
      rootBlock,
      dropPath,
      splitItemPath,
      item
    );

    return nextRootBlock;
  }
};
