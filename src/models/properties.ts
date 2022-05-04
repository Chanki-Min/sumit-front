export type BlockProperty =
  | plain_text_props
  | heading_props
  | to_do_list_props
  | bulleted_list_props
  | numbered_list_props
  | media_image_props
  | media_video_props
  | media_file_props
  | carousel_slide
  | simple_margin_props
  | grid_props;

export type BlockTypes =
  | "plain_text"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "to_do_list"
  | "bulleted_list"
  | "numbered_list"
  | "media_image"
  | "media_video"
  | "media_file"
  | "carousel_slide"
  | "simple_margin"
  | "grid";

export interface plain_text_props {
  text: string; // html strings, should be sanitized
}

export function isPlainTextProps(u: any): u is plain_text_props {
  return typeof u?.text === "string";
}

interface heading_props {
  text: string; // html strings, should be sanitized
}

export function isHeadingProps(u: any): u is heading_props {
  return typeof u?.text === "string";
}

export interface to_do_list_props {
  checked: boolean;
  text: string; // html strings, should be sanitized
}

export function isToDoListProps(u: any): u is to_do_list_props {
  return typeof u?.text === "string" && typeof u?.checked === "boolean";
}

interface bulleted_list_props {
  text: string; // html strings, should be sanitized
}

export function isBulltedListProps(u: any): u is bulleted_list_props {
  return typeof u?.text === "string";
}

interface numbered_list_props {
  text: string; // html strings, should be sanitized
}

export function isNumberdListProps(u: any): u is numbered_list_props {
  return typeof u?.text === "string";
}

interface media_image_props {
  width: number;
  height: number;
  src: string; // URL 주소
}

export function isMediaImageProps(u: any): u is media_image_props {
  return (
    typeof u?.src === "string" &&
    typeof u?.width === "number" &&
    typeof u?.height === "number"
  );
}

interface media_video_props {
  width: number;
  height: number;
  src: string; // URL 주소
}

export function isMediaVideoProps(u: any): u is media_video_props {
  return (
    typeof u?.src === "string" &&
    typeof u?.width === "number" &&
    typeof u?.height === "number"
  );
}

interface media_file_props {
  title: string;
  size: number; // 파일 사이즈
  src: string; // URL 주소
}

export function isMediaFileProps(u: any): u is media_file_props {
  return (
    typeof u?.title === "string" &&
    typeof u?.size === "number" &&
    typeof u?.src === "string"
  );
}

interface carousel_slide {
  enable_index_numbers: boolean;
  enalble_navigation_buttons: boolean;
}

export function isCarouselSlideProps(u: any): u is carousel_slide {
  return (
    typeof u?.enable_index_numbers === "boolean" &&
    typeof u?.enalble_navigation_buttons === "boolean"
  );
}

interface simple_margin_props {
  height: number;
}

export function isSimpleMargin(u: any): u is simple_margin_props {
  return typeof u?.height === "number";
}

interface grid_props {
  row_size: number;
  col_size: number;

  row_ratios: number[];
  col_ratios: number[];

  width: number;
  height: number;
}

export function isGridProps(u: any): u is grid_props {
  return (
    typeof u?.row_size === "number" &&
    typeof u?.col_size === "number" &&
    typeof u?.width === "number" &&
    typeof u?.height === "number" &&
    Array.isArray(u?.row_ratios) &&
    Array.isArray(u?.col_ratios)
  );
}
