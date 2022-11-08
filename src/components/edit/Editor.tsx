import { Block } from "../../models/block";
import { v4 as uuidv4 } from "uuid";
import EditableBlock from "./Block/EditableBlock";
import { useEffect, useRef } from "react";
import { findLastChildPath, IWithPath } from "../../tree/tree";
import { setCaretToEnd } from "../../tree/treeUtil";
import { useBlockByIdQuery } from "../../api/block/fetchBlock";
import { useCreateBlockMutation } from "../../api/block/createBlock";
import { useMoveBlockMutation } from "../../api/block/moveBlock";
import { useDeleteBlockMutation } from "../../api/block/deleteBlock";
import { useIndentBlockMutation } from "../../api/block/intentBlock";
import { useUpdateBlockMutation } from "../../api/block/updateBlock";
import { IS_SERVER_SIDE, LOCAL_STORAGE_KEYS } from "../../Contstants";
import axios from "axios";
import { debounce, throttle } from "lodash";

interface EditorProps {
  rootBlockId: string;
}

const throttledSync = debounce(
  (block: Block) => {
    try {
      axios.post("/api/blocks/bulk", block);
    } catch (e) {
      console.error(e);
    }
  },
  3000,
  { trailing: true }
);

const Editor: React.FC<EditorProps> = ({ rootBlockId }) => {
  const rootBlockQuery = useBlockByIdQuery(rootBlockId);
  const createBlock = useCreateBlockMutation();
  const updateBlock = useUpdateBlockMutation();
  const moveBlock = useMoveBlockMutation();
  const deleteBlock = useDeleteBlockMutation();
  const indentBlock = useIndentBlockMutation();

  const rootBlockQueryRef = useRef<Block>();

  useEffect(() => {
    if (!rootBlockQuery.isSuccess) {
      return;
    }
    rootBlockQueryRef.current = rootBlockQuery.data;

    throttledSync(rootBlockQuery.data);
  }, [rootBlockQuery.data, rootBlockQuery.isSuccess]);

  useEffect(() => {
    if (typeof rootBlockQuery.data === "undefined") {
      return;
    }

    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.TEMP_STORE,
      JSON.stringify(rootBlockQuery.data)
    );
  }, [rootBlockQuery.data]);

  // enter 키 등 블록을 추가할때 실행한다
  const handleAddBlock = (
    dropPath: number[],
    parentId: string | null,
    newBlock: Block
  ) => {
    if (typeof rootBlockQueryRef.current?.uuid === "string") {
      createBlock.mutate(
        {
          rootBlockId: rootBlockQueryRef.current?.uuid as string,
          parentId: parentId,
          block: newBlock,
          csr: {
            dropPath: dropPath,
          },
        },
        {
          onSuccess: () => {
            moveFocus(dropPath.join("-"));
          },
        }
      );
    }
  };

  const handleDeleteThis = (blockPath: number[], item: Block) => {
    const prevBlockPath = [0, blockPath[1] - 1];

    if (typeof rootBlockQueryRef.current?.uuid === "string") {
      deleteBlock.mutate(
        {
          rootBlockId: rootBlockQueryRef.current?.uuid as string,
          block: item,
          csr: {
            blockPath: blockPath,
          },
        },
        {
          onSuccess: (_ignore1, _ignore2, context) => {
            moveFocus(
              findLastChildPath(
                context.children[blockPath[1] - 1],
                prevBlockPath
              )
            );
          },
        }
      );
    }
  };

  const handleUpdateWithoutChildren = (
    thisPath: number[],
    updateProps: Block
  ) => {
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
    moveBlock.mutate(
      {
        rootBlockId: rootBlockQueryRef.current?.uuid as string,
        targetBlockId: "",
        order: splitDropzonePath[splitDropzonePath.length - 1],
        csr: {
          block: {
            ...item,
            order: splitDropzonePath[splitDropzonePath.length - 1],
          },
          splitDropzonePath: splitDropzonePath,
          itemPath: splitItemPath,
        },
      },
      {
        onSuccess: () => {
          moveFocus(splitDropzonePath.join("-"));
        },
      }
    );
  };

  const handleIndentation = (
    splitParentPath: number[],
    splitItemPath: number[],
    item: Block,
    directon: "left" | "right"
  ) => {
    indentBlock.mutate(
      {
        rootBlockId: rootBlockQueryRef.current?.uuid as string,
        block: item,
        directon: directon,
        csr: {
          splitParentPath: splitParentPath,
          splitItemPath: splitItemPath,
        },
      },
      {
        onSuccess: () => {
          moveFocus(window.__SUBMIT__GLOBAL_FOCUS);
          window.__SUBMIT__GLOBAL_FOCUS = "";
        },
      }
    );
  };

  if (typeof rootBlockQuery.data === "undefined") {
    return <></>;
  }

  return (
    <div id="slide">
      <EditableBlock
        path="0"
        block={rootBlockQuery.data}
        siblingList={[]}
        handleAddBlock={handleAddBlock}
        handleDeleteThis={handleDeleteThis}
        handleUpdateWithoutChildren={handleUpdateWithoutChildren}
        handleMoveToPath={handleMoveToPath}
        handleIndentation={handleIndentation}
      />
    </div>
  );
};

export const moveFocus = (path: string) => {
  if (IS_SERVER_SIDE) {
    return;
  }

  const el = document.querySelector(`#path-${path} > .focusable`);
  if (el !== null) {
    setCaretToEnd(el as HTMLElement);
  }
};

export default Editor;
