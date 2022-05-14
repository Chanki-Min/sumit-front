import { Block } from "../../models/block";
import { v4 as uuidv4 } from "uuid";
import EditableBlock from "./Block/EditableBlock";
import { useEffect, useRef, useState } from "react";
import {
  hadleUpdateChildByPath,
  handleAddBlockByPath,
  handleDeleteBlockByPath,
  handleMoveToDifferentParent,
  handleMoveWithinParent,
  IWithPath,
} from "../../tree/tree";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
      properties: { text: "hello sumit!" },
      parent: null,
      order: 0,
      children: [],
    },
    {
      uuid: uuidv4(),
      type: "plain_text",
      properties: { text: "get some childhood" },
      parent: null,
      order: 1,
      children: [],
    },
  ],
};

const Editor: React.FC = () => {
  const [rootBlock, setRootBlock] = useState<Block>(initialBlock);

  const rootBlockRef = useRef<Block>(rootBlock); // handler function의 closure는 이전 상태를 바라볼 수 있으므로 ref로 수정한다.

  useEffect(() => {
    rootBlockRef.current = rootBlock;
  }, [rootBlock]);

  const handleAddSibling = (
    dropPath: number[],
    newBlock: Block,
    thisElement: HTMLElement | null
  ) => {
    console.log("add before", rootBlockRef.current);
    const newRootBlock = handleAddBlockByPath(
      rootBlockRef.current,
      dropPath,
      newBlock
    );
    setRootBlock(newRootBlock);
  };

  const handleDeleteThis = (
    thisPath: number[],
    thisElement: HTMLElement | null
  ) => {
    debugger;
    console.log("delete before", rootBlockRef.current);
    const newRootBlock = handleDeleteBlockByPath(
      rootBlockRef.current,
      thisPath
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

    console.log(dropzonePath, itemPath);

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
    setRootBlock(newRootBlock);
    return;
  };

  return (
    <div id="slide">
      <DndProvider backend={HTML5Backend}>
        <EditableBlock
          path="0"
          block={rootBlock}
          handleAddSibling={handleAddSibling}
          handleDeleteThis={handleDeleteThis}
          handleUpdateWithoutChildren={handleUpdateWithoutChildren}
          handleMoveToPath={handleMoveToPath}
        />
      </DndProvider>
    </div>
  );
};

export const getDefaultBlock = (parent: string, myIndex: number): Block => {
  return {
    uuid: uuidv4(),
    type: "plain_text",
    properties: {
      text: "",
    },
    children: [],
    order: myIndex,
    parent: parent,
  };
};

export default Editor;
