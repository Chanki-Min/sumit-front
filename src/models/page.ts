import Slide from "./Slide";

export interface Page {
  uuid: string;

  user_uuid: string;

  title: string;

  description: string;

  share: boolean;

  createAt: number; // unix timestamp

  updateAt: number; // unix timestamp

  slides: Slide[];
}
