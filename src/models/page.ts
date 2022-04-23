import Slide from "./Slide";

export interface Page {
  uuid: number;

  user_uuid: string;

  title: string;

  description: string;

  share: boolean;

  createAt: Date;

  updateAt: Date;

  slides: Slide[];
}
