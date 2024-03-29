import { createGlobalStyle } from "styled-components";

// const GlobalStyle = createGlobalStyle`
//     html,
//     body {
//         padding: 0;
//         margin: 0;
//         font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
//         Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
//     }

//     a {
//         color: inherit;
//         text-decoration: none;
//     }

//     * {
//         box-sizing: border-box;
//     }

//     #__next {
//         height: 100%;
//     }

//     [contenteditable=true]:empty:focus:before{
//         content: attr(placeholder);
//         display: block;
//         color: #aaa;
//     }

//     [contenteditable] {
//     -webkit-user-select: text;
//     user-select: text;
// }
// `;

import { reset } from 'styled-reset'; 

export const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
      margin: 0;
      padding: 0;
      font-family: 'Noto Sans KR', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box; /* 엘리먼트의 box-sizing 값을 border-box로 설정 */
      min-height: 100%;
      background-color: #ffffff;
      color: #000000;
    }
    #root {
      min-height: 100%;
    }
    html {
      height: 100%;
      scroll-behavior: smooth;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    * {
      box-sizing: inherit; /* 모든 엘리먼트의 box-sizing 값을 border-box로 설정 */
    }
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
    button {
      background: inherit; 
      border: none; 
      box-shadow: none; 
      border-radius: 0; 
      padding: 0; 
      overflow: visible; 
      cursor: pointer;
      color: #000000e4;
    }
    button:focus {
      outline: none;
    }
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(211, 211, 211, 0.5);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
`;

export default GlobalStyle;
