import { Page } from "../models/page";

interface FetchPagesProps {
  withSlides?: boolean; // default true, false일 경우 슬라이드를 노출하지 않는다
}

const fetchPages = async (options: FetchPagesProps) => {
  const { withSlides } = options;

  if (!!withSlides) {
    return mockData;
  }

  return mockData.map(omitSlide);
};

export default fetchPages;

const omitSlide = (md: Page): Omit<Page, "slides"> => {
  const { slides, ...rest } = md;
  return rest;
};

const mockData: Page[] = [
  {
    uuid: 1,

    user_uuid: "test_user_uuid",

    title: "삼성전자 자기소개서",

    description: "2022 삼성 공채 자기소개서",

    share: true,

    createAt: new Date().getTime(),

    updateAt: new Date().getTime(),

    slides: [],
  },
  {
    uuid: 2,

    user_uuid: "test_user_uuid",

    title: "디자인 포폴 모음",

    description: "내가 지금까지 만든 포폴들",

    share: false,

    createAt: new Date().getTime(),

    updateAt: new Date().getTime(),

    slides: [],
  },
];
