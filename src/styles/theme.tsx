import { DefaultTheme } from 'styled-components';

export const calcRem = (px: number) => `${px / 16}rem`;

export const theme: DefaultTheme = {
  palette: {
    point: {
      lavender: '#bf94e4',
      lavenderDark: '#372d3f',
      red: '#ff7785',
      mint: '#9fe8d6',
      yellow_kakao: '#ffeb00',
      green_starbucks: '#036635',
    },

    mono: {
      white: '#fff',
      white_e6: '#e6e6e6',
      white_fa: '#fafafa',
      black_00: '#000000',
      black_12: '#121212',
      black_26: '#262626',
      black_36: '#363636',
      font_main: '#fafafa',
      font_sub: '#b6b7b8',
      font_placeholder: '#939393',
    },
  },
  typo: {
    title_28_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      28,
    )};line-height: 100%;font-weight: 700;`,
    title_24_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      24,
    )};line-height: 100%;font-weight: 700;`,
    text_18_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      18,
    )};line-height: 100%;font-weight: 700;`,
    text_18_M: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      18,
    )};line-height: 100%;font-weight: 500;`,
    text_18_M_lessSpacing: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      18,
    )};line-height: ${calcRem(22)};font-weight: 500;letter-spacing:${calcRem(
      -0.408,
    )}`,
    text_16_R: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      16,
    )};line-height: 100%;font-weight: 400;`,
    text_14_M: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      14,
    )};line-height: 100%;font-weight: 500;`,
    text_14_R: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      14,
    )};line-height: 100%;font-weight: 400;`,
    text_12_M: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      12,
    )};line-height: 100%;font-weight: 500;`,
    text_12_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      12,
    )};line-height: 100%;font-weight: 700;`,

    text_12_B_lessSpacing: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      12,
    )};line-height: 100%;font-weight: 700;letter-spacing:${calcRem(-0.408)}`,
    placeholder_24_R: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      24,
    )};line-height: 100%;font-weight: 400;`,
    appbar_18_R: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      18,
    )};line-height: 100%;font-weight: 400;`,
    tag_10_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
      10,
    )};line-height: 100%;font-weight: 700;`,
    landing: {
      title_Main: `font-family: 'AmericanTypewriterBold';line-height: 100%;font-weight: 700;`,
      title_48_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
        48,
      )};line-height: 100%;font-weight: 700;`,
      text_36_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
        36,
      )};line-height: 100%;font-weight: 700;`,
      title_24_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
        24,
      )};line-height: 100%;font-weight: 700;`,
      text_18_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
        18,
      )};line-height: 100%;font-weight: 700;`,
      count_96_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
        96,
      )};line-height: 100%;font-weight: 700;`,
      text_22_B: `font-family: 'Noto Sans KR';font-size: ${calcRem(
        22,
      )};line-height: 100%;font-weight: 700;`,
    },
  },
  boxShadow: {
    normal: '0 3px 8px 0 rgb(0 0 0 / 10%)',
  },
  animate: {
    LandingfadeIn: `@keyframes LandingfadeIn {
      from {
        opacity: 0;
        transform: translateY(0);
      }
      to {
        opacity: 1;
        transform: translateY(-50%);
      }
    }`,
  },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};