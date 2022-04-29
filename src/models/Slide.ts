import { Block } from "./block";

interface Slide {
  uuid: number;

  pathname: string;

  order: number;

  page_uuid: string;

  root_block: Block;

  createAt: Date;

  updateAt: Date;
}

export default Slide;
