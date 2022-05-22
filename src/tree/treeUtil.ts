import { BlockProperty, BlockTypes } from "../models/properties";
import { v4 as uuidv4 } from "uuid";
import { SidebarBlock } from "./tree";
import { Block } from "../models/block";
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
