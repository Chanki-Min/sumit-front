import { Block, SidebarBlock } from "../../models/block";
import { v4 as uuidv4 } from "uuid";
import EditableBlock from "./Block/EditableBlock";
import { useEffect, useRef, useState } from "react";
import {
  findLastChildPath,
  hadleUpdateChildByPath,
  handleAddBlockByPath,
  handleDeleteBlockByPath,
  handleMoveToDifferentParent,
  handleMoveToDropzoneWithUnderSiblingToItemChild,
  handleMoveToParentLastChildWithFlat,
  handleMoveWithinParent,
  IWithPath,
} from "../../tree/tree";
import { setCaretToEnd } from "../../tree/treeUtil";
import { useBlockByIdQuery } from "../../api/block/fetchBlock";
import { useCreateBlockMutation } from "../../api/block/createBlock";
import { useMoveBlockMutation } from "../../api/block/moveBlock";
import { useDeleteBlockMutation } from "../../api/block/deleteBlock";
import { useIndentBlockMutation } from "../../api/block/intentBlock";
import { useUpdateBlockMutation } from "../../api/block/updateBlock";
import { cloneDeep } from "lodash";

const initialBlock: Block = {
  uuid: uuidv4(),
  type: "root_block",
  properties: {},
  parent: null,
  order: 0,

  children: [
    {
      uuid: uuidv4(),
      type: "plain_text",
      properties: { text: "" },
      parent: null,
      order: 0,
      children: [],
    },
  ],
};

interface EditorProps {
  rootBlockId: string;
}

const Editor: React.FC<EditorProps> = ({ rootBlockId }) => {
  // TODO: rootBlockQuery로 상태 수정
  const [rootBlock, setRootBlock] = useState<Block>(initialBlock);

  const rootBlockQuery = useBlockByIdQuery(rootBlockId);
  const createBlock = useCreateBlockMutation();
  const updateBlock = useUpdateBlockMutation();
  const moveBlock = useMoveBlockMutation();
  const deleteBlock = useDeleteBlockMutation();
  const indentBlock = useIndentBlockMutation();

  const rootBlockRef = useRef<Block>(rootBlock); // handler function의 closure는 이전 상태를 바라볼 수 있으므로 ref로 수정한다.
  const rootBlockQueryRef = useRef<Block>();
  const nextFocusPathOrNull = useRef<string | null>("0-0");

  // rootBlockRef를 최신화하고, 포커스를 처리한다
  useEffect(() => {
    rootBlockRef.current = rootBlock;
  }, [rootBlock]);

  useEffect(() => {
    if (!rootBlockQuery.isSuccess) {
      return;
    }
    rootBlockQueryRef.current = rootBlockQuery.data;

    if (nextFocusPathOrNull.current !== null) {
      const el = document.querySelector(
        `#path-${nextFocusPathOrNull.current} > .focusable`
      );
      if (el !== null) {
        setCaretToEnd(el as HTMLElement);
      }
      nextFocusPathOrNull.current = null;
    }
  }, [rootBlockQuery.data, rootBlockQuery.isSuccess]);

  // enter 키 등 블록을 추가할때 실행한다
  const handleAddBlock = (dropPath: number[], newBlock: Block) => {
    const newRootBlock = handleAddBlockByPath(
      rootBlockRef.current,
      dropPath,
      newBlock
    );
    nextFocusPathOrNull.current = dropPath.join("-");
    setRootBlock(newRootBlock);

    if (typeof rootBlockQueryRef.current?.uuid === "string") {
      createBlock.mutate({
        rootBlockId: rootBlockQueryRef.current?.uuid as string,
        block: newBlock,
        csr: {
          dropPath: dropPath,
        },
      });
    }
  };

  const handleDeleteThis = (blockPath: number[], item: Block) => {
    const newRootBlock = handleDeleteBlockByPath(
      rootBlockRef.current,
      blockPath,
      item,
      false
    );

    const prevBlockPath = [0, blockPath[1] - 1];
    nextFocusPathOrNull.current = findLastChildPath(
      rootBlock.children[blockPath[1] - 1],
      prevBlockPath
    );
    setRootBlock(newRootBlock);

    if (typeof rootBlockQueryRef.current?.uuid === "string") {
      deleteBlock.mutate({
        rootBlockId: rootBlockQueryRef.current?.uuid as string,
        block: item,
        csr: {
          blockPath: blockPath,
        },
      });
    }
  };

  const handleUpdateWithoutChildren = (
    thisPath: number[],
    updateProps: Block
  ) => {
    const newRootBlock = hadleUpdateChildByPath(
      rootBlockRef.current,
      thisPath,
      updateProps
    );
    setRootBlock(newRootBlock);

    if (typeof rootBlockQueryRef.current?.uuid === "string") {
      updateBlock.mutate({
        rootBlockId: rootBlockQueryRef.current?.uuid as string,
        block: updateProps,
        csr: {
          blockPath: thisPath,
        },
      });
    }
  };

  const handleMoveToPath = (
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

    moveBlock.mutate({
      rootBlockId: rootBlockQueryRef.current?.uuid as string,
      targetBlockId: "",
      block: item,
      csr: {
        splitDropzonePath: splitDropzonePath,
        itemPath: splitItemPath,
      },
    });

    // case: dropzone과 itemPath의 부모가 동일한 경우
    if (dropzoneParentPath === itemParentPath) {
      const newRootBlock = handleMoveWithinParent(
        rootBlockRef.current,
        splitDropzonePath,
        splitItemPath
      );
      nextFocusPathOrNull.current = splitDropzonePath.join("-");
      setRootBlock(newRootBlock);
      return;
    }

    // case: dropzone과 itemPath의 부모가 다른 경우 {
    const newRootBlock = handleMoveToDifferentParent(
      rootBlockRef.current,
      splitDropzonePath,
      splitItemPath,
      item
    );
    nextFocusPathOrNull.current = splitDropzonePath.join("-");
    setRootBlock(newRootBlock);
    return;
  };

  const handleIndentation = (
    splitParentPath: number[],
    splitItemPath: number[],
    item: Block,
    directon: "left" | "right"
  ) => {
    indentBlock.mutate({
      rootBlockId: rootBlockQueryRef.current?.uuid as string,
      block: item,
      directon: directon,
      csr: {
        splitParentPath: splitParentPath,
        splitItemPath: splitItemPath,
      },
    });

    if (directon === "right") {
      const [newRootBlock, droppedPath] = handleMoveToParentLastChildWithFlat(
        rootBlockRef.current,
        splitParentPath,
        splitItemPath,
        item
      );
      nextFocusPathOrNull.current = droppedPath;
      setRootBlock(newRootBlock);
    } else {
      // left tab의 경우, 나를 dropzone에 떨구고, 내 형제들을 모두 내 자식으로 편입시킨다
      const dropPath = Array.from(splitParentPath);
      //  예외 상항 (더 이상 왼쪽으로 이동할 수 없는 경우) 무시한다
      if (dropPath.length < 2 || dropPath[0] === 1) {
        return;
      }
      const nextRootBlock = handleMoveToDropzoneWithUnderSiblingToItemChild(
        rootBlockRef.current,
        dropPath,
        splitItemPath,
        item
      );
      nextFocusPathOrNull.current = dropPath.join("-");
      setRootBlock(nextRootBlock);
    }
  };

  if (typeof rootBlockQuery.data === "undefined") {
    return <></>;
  }

  return (
    <div id="slide">
      <EditableBlock
        path="0"
        block={rootBlockQuery.data}
        handleAddBlock={handleAddBlock}
        handleDeleteThis={handleDeleteThis}
        handleUpdateWithoutChildren={handleUpdateWithoutChildren}
        handleMoveToPath={handleMoveToPath}
        handleIndentation={handleIndentation}
      />
    </div>
  );
};

export default Editor;
