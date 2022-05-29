import { Block } from "./block";

interface Slide {
  uuid: string;

  pathname: string;

  order: number;

  page_uuid: string;

  root_block: Block;

  createAt: number;

  updateAt: number;
}

export default Slide;
