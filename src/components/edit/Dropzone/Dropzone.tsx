import { useDrop } from "react-dnd";
import styled from "styled-components";
import { Block } from "../../../models/block";
import { IWithPath } from "../../../tree/tree";

export const ItemTypes = {
  BLOCK: "block",
} as const;

interface DropzoneProps {
  path: string;
  isLastDropzoneOnThisDepth: boolean;
  handleMoveToPath: (
    dropzonePath: number[],
    { path: itemPath, ...item }: IWithPath<Block>
  ) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
  path,
  isLastDropzoneOnThisDepth,
  handleMoveToPath,
}) => {
  const splitDropzonePath: number[] = path.split("-").map(Number);

  const [{ isOver, canDrop }, drop] = useDrop<
    IWithPath<Block>,
    unknown, // drop function 의 반환 결과는 사용하지 않는다
    { isOver: boolean; canDrop: boolean }
  >(() => ({
    accept: ItemTypes.BLOCK,

    canDrop: ({ path: itemPath, ...block }, monitor) => {
      // Dropzone이 item과 같거나, 내부에 있다면 drop할 수 없다
      if (path.startsWith(itemPath)) {
        return false;
      }

      // Dropzone과 item의 부모가 같으며, Dropzone이 현재 부모의 마지막 Dropzone이며, item이 마지막 child라면 drop할 수 없다
      const splitItemPath = itemPath.split("-").map(Number);
      const itemParentPath = splitItemPath.slice(0, -1).join("-");
      const dropzoneParentPath = splitDropzonePath.slice(0, -1).join("-");
      if (
        isLastDropzoneOnThisDepth &&
        dropzoneParentPath === itemParentPath &&
        splitDropzonePath[splitDropzonePath.length - 1] ===
          splitItemPath[splitItemPath.length - 1] + 1
      ) {
        return false;
      }

      // 나머지 모든 경우는 Drop 가능하다
      return true;
    },
    drop: (blockWithPath: IWithPath<Block>) => {
      console.log("dropping to path:", path);
      handleMoveToPath(splitDropzonePath, blockWithPath);
    },
    collect: (monitor) => ({
      isOver: !!monitor?.isOver(),
      canDrop: !!monitor?.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;

  return <DropzoneContaier ref={drop} isActive={isActive} />;
};

const DropzoneContaier = styled.div<{ isActive: boolean }>`
  width: calc(100% - 18px);
  height: 8px;
  background-color: ${(p) => (p.isActive ? "blue" : "transparent")};
  margin: 0 0 5px 18px;
`;

export default Dropzone;
