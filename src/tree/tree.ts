import { Block } from "../models/block";

/**
 * 같은 parent block 안에서 drop된 children의 위치를 변경한다
 *
 * @param rootBlock
 * @param splitDropZonePath
 * @param splitItemPath
 * @returns
 */
export const handleMoveWithinParent = (
  rootBlock: Block,
  splitDropZonePath: number[],
  splitItemPath: number[]
) => {
  return _reorderChildren(
    rootBlock.children,
    splitDropZonePath.slice(1),
    splitItemPath.slice(1)
  );
};

/**
 * __PURE__ list 객체의 from을 to로 이동한 새로운 배열을 반환합니다.
 * @param list
 * @param fromIndex
 * @param toIndex
 * @returns
 */
const _move = <T>(list: T[], fromIndex: number, toIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);

  return result;
};

/**
 * __PURE__ list의 index에 있는 객체를 삭제한 새로운 배열을 반환합니다.
 * @param list
 * @param index
 * @returns
 */
const _remove = <T>(list: T[], index: number): T[] => [
  // part of the array before the specified index
  ...list.slice(0, index),
  // part of the array after the specified index
  ...list.slice(index + 1),
];

/**
 * __PURE__ list의 index에 새로운 item을 삽입하고, 오른쪽 엘리먼트들을 right shift한 배열을 반환합니다
 * @param list
 * @param index
 * @param newItem
 * @returns
 */
const _insert = <T>(list: T[], index: number, newItem: T) => [
  ...list.slice(0, index),
  // 삽입된 item
  newItem,
  ...list.slice(index),
];

/**
 * __PURE__ __REQURSIVE__
 *
 * 같은 parent 안에서 drop된 children의 위치를 변경한다
 *
 * @param children
 * @param splitDropZonePath : drop된 위치의 path
 * @param splitItemPath: 현재 item의 path
 * @returns
 */
const _reorderChildren = <T extends { children: T[] }>(
  children: T[],
  splitDropZonePath: number[],
  splitItemPath: number[]
): T[] => {
  // 재귀 탈출 조건, drop된 path의 길이가 1이라는것은 마지막 단계라는 의미이다.
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    const itemIndex = Number(splitItemPath[0]);
    return _move(children, itemIndex, dropZoneIndex); // itemIndex에서 dropZone index로 이동시킨다
  }

  // 아직 마지막 단계가 아니라면, 현재 children은 그대로 두고 path에 해당하는 child만 수정하도록 한다
  const updatedChildren = Array.from(children);

  const currentStepIndex = Number(splitDropZonePath.slice(0, 1));

  const splitDropZoneNextPath = splitDropZonePath.slice(1);
  const splitItemNextPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[currentStepIndex];

  updatedChildren[currentStepIndex] = {
    ...nodeChildren,
    children: _reorderChildren(
      nodeChildren.children,
      splitDropZoneNextPath,
      splitItemNextPath
    ),
  };

  return updatedChildren;
};

// export type BlockWithPath = Block & {
//   path: string; // '-' splitted path
// };

// /**
//  * API 응답으로 받은 block 객체를 javascript가 탐색할 수 있도록 path를 붙인 인터페이스 객체를 반환한다.
//  * path는 depth 배열을 하이픈 (-) 으로 join한 string이다. root block의 depth는 0으로 한다
//  *
//  * @author Chanki Min
//  * @param rootBlock api 응답으로 돌아온 block 객체
//  * @returns path가 붙여진 블록 객체
//  */
// export const initializeBlockWithPath = (rootBlock: Block): BlockWithPath => {
//   if (rootBlock.children.length === 0) {
//     return {
//       ...rootBlock,
//       path: "0",
//     };
//   }

//   return {
//     ...rootBlock,
//     path: "0",
//     children: rootBlock.children.map((child, index) =>
//       __internel__reqursive__initializeBlockWithPath(child, `0-${index}`)
//     ),
//   };
// };

// /**
//  * API 응답으로 받은 block 객체를 javascript가 탐색할 수 있도록 path를 붙인 인터페이스 객체를 반환한다.
//  * path는 depth 배열을 하이픈 (-) 으로 join한 string이다. root block의 depth는 0으로 한다
//  *
//  * 재귀 함수를 외부로 노출할 경우 예상치 못한 path 매개변수를 넣을 위험이 있기 때문에 internel reqursive는
//  * export 하지 않는다
//  *
//  * @author Chanki Min
//  * @param block api 응답으로 돌아온 block 객체
//  * @returns path가 붙여진 블록 객체
//  */
// const __internel__reqursive__initializeBlockWithPath = (
//   block: Block,
//   path: string
// ): BlockWithPath => {
//   if (!path.startsWith("0")) {
//     throw new Error(
//       "initializeBlockWithPath: Unexpected starting path, path should start with '0'"
//     );
//   }

//   if (block.children.length === 0) {
//     return {
//       ...block,
//       path: path,
//     };
//   }

//   return {
//     ...block,
//     path: path,
//     children: block.children.map((child, index) =>
//       __internel__reqursive__initializeBlockWithPath(child, `${path}-${index}`)
//     ),
//   };
// };
