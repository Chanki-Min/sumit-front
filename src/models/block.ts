import { BlockProperty } from "./properties";

export type Block = BlockProperty & {
  uuid: string;

  children: Block[]; // 문제점: Typeorm 에서 children의 순서를 지정하기 어려움

  order: number;

  parent: number | null;
};
