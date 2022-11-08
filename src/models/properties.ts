export type BlockFields =
  | root_block_props
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
  | grid_props
  | grid_divider_props;

export type BlockTypes = BlockFields["type"];

export type BlockProperties = BlockFields["properties"];

export interface root_block_props {
  type: "root_block";
  properties: {};
}
export interface plain_text_props {
  type: "plain_text";
  properties: {
    text: string; // html strings, should be sanitized
  };
}

export interface heading_props {
  type: "heading_1" | "heading_2" | "heading_3";
  properties: {
    text: string; // html strings, should be sanitized
  };
}

export interface to_do_list_props {
  type: "to_do_list";

  properties: {
    text: string; // html strings, should be sanitized
    checked: boolean;
  };
}

export interface bulleted_list_props {
  type: "bulleted_list";
  properties: {
    text: string; // html strings, should be sanitized
  };
}

export interface numbered_list_props {
  type: "numbered_list";
  properties: {
    text: string; // html strings, should be sanitized
  };
}

interface media_image_props {
  type: "media_image";
  properties: {
    width: number;
    height: number;
    src: string; // URL 주소
  };
}

interface media_video_props {
  type: "media_video";
  properties: {
    width: number;
    height: number;
    src: string; // URL 주소
  };
}

interface media_file_props {
  type: "media_file";
  properties: {
    title: string;
    size: number; // 파일 사이즈
    src: string; // URL 주소
  };
}

interface carousel_slide {
  type: "carousel_slide";
  properties: {
    enable_index_numbers: boolean;
    enalble_navigation_buttons: boolean;
  };
}

export interface simple_margin_props {
  type: "simple_margin";
  properties: {
    height: number;
  };
}

export interface grid_props {
  type: "grid_1x2" | "grid_1x3";
  properties: {
    row_ratios: number[];
    col_ratios: number[];
  };
}
export interface grid_divider_props {
  type: "grid_divider";
  properties: {};
}
