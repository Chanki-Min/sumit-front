import { cloneDeep } from "lodash";
import { Block } from "../models/block";

interface IHasChildren<T> {
  children: T[];
}

export type IWithPath<T extends {}> = T & {
  path: string;
};

export const findLastChildPath = (
  block: Block,
  splitItemPath: number[]
): string => {
  if (block.children.length === 0) {
    return splitItemPath.join("-");
  }

  const nextPath = [...splitItemPath, block.children.length - 1];
  return findLastChildPath(block.children[block.children.length - 1], nextPath);
};

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
  const newRootBlock = cloneDeep(rootBlock);
  newRootBlock.children = _reorderChildren(
    newRootBlock.children,
    splitDropZonePath.slice(1),
    splitItemPath.slice(1)
  );

  return newRootBlock;
};

/**
 *
 * @param rootBlock
 * @param splitDropZonePath
 * @param splitItemPath
 * @param item
 * @param isIndentMode True 일 경우, item의 1차 자식들까지 모두 편입시킨다, 이는 indentation에서 사용 가능하다
 * @returns
 */
export const handleMoveToDifferentParent = (
  rootBlock: Block,
  splitDropZonePath: number[],
  splitItemPath: number[],
  item: Block,
  isIndentMode: boolean = false
) => {
  const newRootBlock = cloneDeep(rootBlock);

  newRootBlock.children = _removeChildByPath(
    newRootBlock.children,
    splitItemPath.slice(1)
  );

  newRootBlock.children = _addChildByPath(
    newRootBlock.children,
    splitDropZonePath.slice(1),
    item
  );

  if (isIndentMode) {
    newRootBlock.children = item.children.reduce((acc, block, index) => {
      const nextDropzone = Array.from(splitDropZonePath);
      nextDropzone[nextDropzone.length - 1] += index + 1;
      return _addChildByPath(acc, nextDropzone, block);
    }, newRootBlock.children);
  }

  return newRootBlock;
};

export const handleMoveToParentLastChildWithFlat = (
  rootBlock: Block,
  splitParentPath: number[],
  splitItemPath: number[],
  item: Block
): [Block, string] => {
  const newRootBlock = cloneDeep(rootBlock);
  const initialDropPath = [
    ...splitParentPath,
    _find(newRootBlock.children, splitParentPath.slice(1)).children.length,
  ];

  newRootBlock.children = _removeChildByPath(
    newRootBlock.children,
    splitItemPath.slice(1)
  );

  console.log(`indent: move from ${splitItemPath} to ${initialDropPath}`);
  newRootBlock.children = _addChildByPath(
    newRootBlock.children,
    initialDropPath.slice(1),
    {
      ...item,
      children: [],
    }
  );

  newRootBlock.children = item.children.reduce((acc, block, index) => {
    const nextDropzone = Array.from(initialDropPath);
    nextDropzone[nextDropzone.length - 1] += index + 1;
    console.log(
      `indent: move from ${[...splitItemPath, index]} to ${nextDropzone}`
    );
    return _addChildByPath(acc, nextDropzone.slice(1), block);
  }, newRootBlock.children);

  return [newRootBlock, initialDropPath.join("-")];
};

export const handleAddBlockByPath = (
  rootBlock: Block,
  splitDropZonePath: number[],
  item: Block
) => {
  let newRootBlock = cloneDeep(rootBlock);
  newRootBlock.children = _addChildByPath(
    newRootBlock.children,
    splitDropZonePath.slice(1),
    item
  );
  return newRootBlock;
};

export const handleDeleteBlockByPath = (
  rootBlock: Block,
  splitItemPath: number[],
  item: Block,
  withChildren: boolean
) => {
  let newRootBlock = cloneDeep(rootBlock);
  newRootBlock.children = _removeChildByPath(
    newRootBlock.children,
    splitItemPath.slice(1)
  );

  if (!withChildren) {
    newRootBlock.children = item.children.reduce((acc, block, index) => {
      const nextDropzone = Array.from(splitItemPath);
      nextDropzone[nextDropzone.length - 1] += index;
      console.log(
        `indent: move from ${[...splitItemPath, index]} to ${nextDropzone}`
      );
      return _addChildByPath(acc, nextDropzone.slice(1), block);
    }, newRootBlock.children);
  }

  return newRootBlock;
};

export const hadleUpdateChildByPath = (
  rootBlock: Block,
  splitItemPath: number[],
  updateProps: Omit<Block, "children">
) => {
  let newRootBlock = cloneDeep(rootBlock);
  newRootBlock.children = _updateChildDataByPath(
    newRootBlock.children,
    splitItemPath.slice(1),
    updateProps
  );
  return newRootBlock;
};

const _updateChildDataByPath = <T extends IHasChildren<T>>(
  children: T[],
  splitItemPath: number[],
  item: Omit<T, "children">
) => {
  // 재귀 탈출 조건, 해당 child를 변경한다
  if (splitItemPath.length === 1) {
    children[splitItemPath[0]] = {
      ...item,
      children: children[splitItemPath[0]].children,
    } as T;
    return children;
  }

  // 아직 마지막 단계가 아니라면, 현재 children은 그대로 두고 path에 해당하는 child만 수정하도록 한다
  const updatedChildren = cloneDeep(children);

  const currentStepIndex = Number(splitItemPath.slice(0, 1));

  const splitItemNextPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[currentStepIndex];

  updatedChildren[currentStepIndex] = {
    ...nodeChildren,
    children: _updateChildDataByPath(
      nodeChildren.children,
      splitItemNextPath,
      item
    ),
  };

  return updatedChildren;
};

const _find = <T extends IHasChildren<T>>(list: T[], path: number[]): T => {
  if (path.length === 1) {
    return list[path[0]];
  }
  const currentStepIndex = Number(path.slice(0, 1));
  const nextPath = path.slice(1);

  return _find(list[currentStepIndex].children, nextPath);
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
const _reorderChildren = <T extends IHasChildren<T>>(
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

/**
 * __PURE__ __REQURSIVE__
 *
 * 해당 splitItemPath 에 있는 child를 제거합니다
 *
 * @param children
 * @param splitDropZonePath : drop된 위치의 path
 * @param splitItemPath: 현재 item의 path
 * @returns
 */
const _removeChildByPath = <T extends IHasChildren<T>>(
  children: T[],
  splitItemPath: number[]
) => {
  if (splitItemPath.length === 1) {
    const itemIndex = Number(splitItemPath[0]);
    return _remove(children, itemIndex);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitItemPath.slice(0, 1));

  // Update the specific node's children
  const splitItemChildrenPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: _removeChildByPath(nodeChildren.children, splitItemChildrenPath),
  };

  return updatedChildren;
};

/**
 * __PURE__ __REQURSIVE__
 *
 * 해당 splitItemPath 에 새로운 item을 추가합니다
 *
 * @param children
 * @param splitDropZonePath : drop된 위치의 path
 * @param splitItemPath: 현재 item의 path
 * @returns
 */
const _addChildByPath = <T extends IHasChildren<T>>(
  children: T[],
  splitDropZonePath: number[],
  item: T
) => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    return _insert(children, dropZoneIndex, item);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitDropZonePath.slice(0, 1));

  // Update the specific node's children
  const splitItemChildrenPath = splitDropZonePath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: _addChildByPath(
      nodeChildren.children,
      splitItemChildrenPath,
      item
    ),
  };

  return updatedChildren;
};
