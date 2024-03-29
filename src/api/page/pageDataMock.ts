import { Block } from "../../models/block";
import { Page } from "../../models/page";

export const rootBlockMock: Block = {
  uuid: "root_block_mock",
  type: "root_block",
  properties: {},
  parent: null,
  order: 0,
  children: [
    {
      uuid: "8fdab844-fc07-4530-815f-a84ae876b231231",
      type: "plain_text",
      properties: { text: "" },
      parent: null,
      order: 0,
      children: [],
    },
  ],
};

const mockPageUUID = "test_page";
export const pageMockData: Page[] = [
  {
    uuid: mockPageUUID,
    user_uuid: "test_user_uuid",
    title: "나의 페이지 1",
    description: "졸업프로젝트 1학기 데모 페이지",
    share: true,
    createAt: 0, // unix timestamp
    updateAt: 0, // unix timestamp
    hashtags: ["포트폴리오", "삼성전자"],

    slides: [
      {
        uuid: "test_slide_uuid_0",
        pathname: "/",
        order: 0,
        page_uuid: mockPageUUID,
        root_block: rootBlockMock,
        createAt: 0,
        updateAt: 0,
      },
    ],
  },
];
