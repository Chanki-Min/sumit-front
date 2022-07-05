import styled from "styled-components";

export const DraggerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: stretch;
  width: 100%;
  padding: 4px 0;

  * {
    flex: 1 1;
  }

  &::before {
    display: inline-block;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font: var(--fa-font-solid);
    content: "\f550";

    visibility: hidden;
    flex: 0 0;
    margin: 4px 3px 0 0;
  }

  &:focus-within::before {
    visibility: visible;
    content: "\f550";
  }
`;
