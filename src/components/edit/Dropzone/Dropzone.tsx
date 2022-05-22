import classNames from "classnames";
import { useEffect } from "react";
import { useDrop, XYCoord } from "react-dnd";
import styled, { css } from "styled-components";
import { Block, isSidebarBlock, SidebarBlock } from "../../../models/block";
import { handleAddBlockByPath, IWithPath } from "../../../tree/tree";

export const ItemTypes = {
  BLOCK: "block",
  SIDEBAR_BLOCK: "sidebar_block",
} as const;

interface DropzoneProps {
  isLast?: boolean;
  path: string;
  handleMoveToPath: (
    dropzonePath: number[],
    { path: itemPath, ...item }: IWithPath<Block>
  ) => void;
  handleAddBlock: (dropPath: number[], newBlock: Block) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
  isLast,
  path,
  handleMoveToPath,
  handleAddBlock,
}) => {
  const splitDropzonePath: number[] = path.split("-").map(Number);

  const [{ isOver, canDrop }, drop] = useDrop<
    IWithPath<Block> | SidebarBlock,
    unknown, // drop function 의 반환 결과는 사용하지 않는다
    { isOver: boolean; canDrop: boolean }
  >(
    () => ({
      accept: [ItemTypes.BLOCK, ItemTypes.SIDEBAR_BLOCK],

      canDrop: (blockWithPathOrSidebarBlock, monitor) => {
        const itemType = monitor.getItemType();
        if (itemType === ItemTypes.SIDEBAR_BLOCK) {
          return true; // 사이드바에서 끌어온 블록은 항상 허용한다
        }
        const itemPath = (blockWithPathOrSidebarBlock as IWithPath<Block>).path;

        // Dropzone이 item과 같거나, 내부에 있다면 drop할 수 없다
        if (path.startsWith(itemPath)) {
          return false;
        }

        // Dropzone과 item의 부모가 같으며, Dropzone이 item 바로 다음이면 드랍할 수 없다
        const splitItemPath = itemPath.split("-").map(Number);
        const itemParentPath = splitItemPath.slice(0, -1).join("-");
        const dropzoneParentPath = splitDropzonePath.slice(0, -1).join("-");
        if (
          dropzoneParentPath === itemParentPath &&
          splitDropzonePath[splitDropzonePath.length - 1] ===
            splitItemPath[splitItemPath.length - 1] + 1
        ) {
          return false;
        }

        // 나머지 모든 경우는 Drop 가능하다
        return true;
      },
      drop: (
        blockWithPathOrSidebarBlock: IWithPath<Block> | SidebarBlock,
        monitor
      ) => {
        console.log("dropping to path:", path);
        if (isSidebarBlock(blockWithPathOrSidebarBlock)) {
          handleAddBlock(splitDropzonePath, {
            ...blockWithPathOrSidebarBlock,
            order: splitDropzonePath[splitDropzonePath.length - 1],
            parent: null,
          } as Block);
        } else {
          handleMoveToPath(splitDropzonePath, blockWithPathOrSidebarBlock);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor?.isOver(),
        // offset: monitor?.get(),
        canDrop: !!monitor?.canDrop(),
      }),
    }),
    [[path]]
  );

  const isActive = isOver && canDrop;

  return (
    <DropzoneContaier
      className={classNames("dropzone", path, { isLast: isLast })}
      path={path}
      ref={drop}
      isActive={isActive}
    ></DropzoneContaier>
  );
};

const DropzoneContaier = styled.div<{ isActive: boolean; path: string }>`
  width: calc(100% - 18px);
  height: 8px;
  background-color: ${(p) => (p.isActive ? "blue" : "transparent")};
  margin: 0 0 0 18px;
  position: absolute;
  top: -4px;
  z-index: ${(p) => (p.isActive ? 100 : p.path.length)};
  z-index: ${(p) => p.path.length};
`;

export default Dropzone;
