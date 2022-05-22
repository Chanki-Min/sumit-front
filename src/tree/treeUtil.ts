import { BlockProperty, BlockTypes } from "../models/properties";
import { v4 as uuidv4 } from "uuid";

import { Block, SidebarBlock } from "../models/block";
export const getNextPath = (splitedPath: number[]) => {
  const nextPath = Array.from(splitedPath);
  nextPath[nextPath.length - 1]++;
  return nextPath;
};

export const setCaretToEnd = (element: HTMLElement) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
};

// export const getCaretYposition = (element: HTMLElement) => {
//   const selection = window.getSelection();
//   const range = selection?.getRangeAt(0);
//   const rect = range?.getClientRects()[0];

//   const elementRect = element.getBoundingClientRect();

//   console.log(rect?.left, rect?.right, elementRect);
// };

// export const getCaretTopPoint = () => {
//   const sel = document.getSelection();
//   debugger;
//   if (sel === null) {
//     return;
//   }
//   const r = sel.getRangeAt(0);
//   let rect;
//   let r2;
//   // supposed to be textNode in most cases
//   // but div[contenteditable] when empty
//   const node = r.startContainer;
//   const offset = r.startOffset;
//   if (offset > 0) {
//     // new range, don't influence DOM state
//     r2 = document.createRange();
//     r2.setStart(node, offset - 1);
//     r2.setEnd(node, offset);
//     // https://developer.mozilla.org/en-US/docs/Web/API/range.getBoundingClientRect
//     // IE9, Safari?(but look good in Safari 8)
//     rect = r2.getBoundingClientRect();
//     return { left: rect.right, top: rect.top };
//   } else if (offset < node.length) {
//     r2 = document.createRange();
//     // similar but select next on letter
//     r2.setStart(node, offset);
//     r2.setEnd(node, offset + 1);
//     rect = r2.getBoundingClientRect();
//     return { left: rect.left, top: rect.top };
//   } else {
//     // textNode has length
//     // https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
//     rect = node.getBoundingClientRect();
//     const styles = getComputedStyle(node);
//     const lineHeight = parseInt(styles.lineHeight);
//     const fontSize = parseInt(styles.fontSize);
//     // roughly half the whitespace... but not exactly
//     const delta = (lineHeight - fontSize) / 2;
//     return { left: rect.left, top: rect.top + delta };
//   }
// };

export function getBlockPrototype(
  type: BlockTypes,
  options: undefined
): SidebarBlock;
export function getBlockPrototype(
  type: BlockTypes,
  options: {
    order: number;
    parent: string | null;
  }
): Block;

export function getBlockPrototype(
  type: BlockTypes,
  options:
    | {
        order: number;
        parent: string | null;
      }
    | undefined
): SidebarBlock | Block {
  switch (type) {
    case "plain_text":
      if (options) {
        return {
          uuid: uuidv4(),
          type: "plain_text",
          properties: {
            text: "",
          },
          children: [],
          order: options.order,
          parent: options.parent,
        };
      } else {
        return {
          uuid: uuidv4(),
          type: "plain_text",
          properties: {
            text: "",
          },
          children: [],
        };
      }

    default:
      if (options) {
        return {
          uuid: uuidv4(),
          type: "plain_text",
          properties: {
            text: "",
          },
          children: [],
          order: options.order,
          parent: options.parent,
        };
      } else {
        return {
          uuid: uuidv4(),
          type: "plain_text",
          properties: {
            text: "",
          },
          children: [],
        };
      }
  }
}
