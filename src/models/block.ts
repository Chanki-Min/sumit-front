import { BlockFields } from "./properties";

export type Block = BlockFields & {
  uuid: string;

  children: Block[]; // 문제점: Typeorm 에서 children의 순서를 지정하기 어려움

  order: number;

  parent: string | null;
};

export type SidebarBlock = Omit<Block, "order" | "parent">;

export function isSidebarBlock(obj: any): obj is SidebarBlock {
  return (
    typeof obj === "object" &&
    typeof obj["uuid"] === "string" &&
    typeof obj["order"] === "undefined" &&
    typeof obj["parent"] === "undefined" &&
    Array.isArray(obj["children"])
  );
}
