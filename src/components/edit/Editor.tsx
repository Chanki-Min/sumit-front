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

const Editor: React.FC = () => {
  const [rootBlock, setRootBlock] = useState<Block>(initialBlock);

  const rootBlockRef = useRef<Block>(rootBlock); // handler function의 closure는 이전 상태를 바라볼 수 있으므로 ref로 수정한다.
  const nextFocusPathOrNull = useRef<string | null>(null);

  // rootBlockRef를 최신화하고, 포커스를 처리한다
  useEffect(() => {
    rootBlockRef.current = rootBlock;
    if (nextFocusPathOrNull.current !== null) {
      const el = document.querySelector(
        `#path-${nextFocusPathOrNull.current} > .focusable`
      );
      if (el !== null) {
        setCaretToEnd(el as HTMLElement);
      }
      nextFocusPathOrNull.current = null;
    }
  }, [rootBlock]);

  // enter 키 등 블록을 추가할때 실행한다
  const handleAddBlock = (dropPath: number[], newBlock: Block) => {
    const newRootBlock = handleAddBlockByPath(
      rootBlockRef.current,
      dropPath,
      newBlock
    );
    nextFocusPathOrNull.current = dropPath.join("-");
    setRootBlock(newRootBlock);
  };

  const handleDeleteThis = (thisPath: number[], item: Block) => {
    const newRootBlock = handleDeleteBlockByPath(
      rootBlockRef.current,
      thisPath,
      item,
      false
    );

    const prevBlockPath = [0, thisPath[1] - 1];
    nextFocusPathOrNull.current = findLastChildPath(
      rootBlock.children[thisPath[1] - 1],
      prevBlockPath
    );
    setRootBlock(newRootBlock);
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
      // TODO: left tab은 내 형제를 내 마지막 자식 다음으로 편입해야 한다

      const dropPath = Array.from(splitParentPath);
      // dropPath[dropPath.length - 1];
      const nextRootBlock = handleMoveToDropzoneWithUnderSiblingToItemChild(
        rootBlockRef.current,
        dropPath,
        splitItemPath,
        item
      );
      setRootBlock(nextRootBlock);
      // handleMoveToPath(dropPath, {
      //   ...item,
      //   path: splitItemPath.join("-"),
      // });
    }
  };
  return (
    <div id="slide">
      <EditableBlock
        path="0"
        block={rootBlock}
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
