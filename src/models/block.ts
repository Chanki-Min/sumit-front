import { BlockProperty, BlockTypes } from "./properties";

export interface Block {
  uuid: number;

  type: BlockTypes; // title_1, image 등의 블록 타입을 지정

  properties: BlockProperty; // type에 따른 블록의 데이터

  children: Block[]; // 문제점: Typeorm 에서 children의 순서를 지정하기 어려움

  order: number;

  parent: number | null;

}
