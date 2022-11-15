import styled, { css } from "styled-components";

interface SliderProps {
  open: boolean;
  width: string;
  delay?: number;
  borderDirection: "left" | "right";
}

export const Slider = styled.div<SliderProps>`
  height: 100%;
  box-sizing: border-box;
  width: 200px;
  width: ${(p) => (p.open ? p.width : 0)};
  padding: ${(p) => (p.open ? "10px" : 0)};

  display: flex;
  flex-direction: column;
  gap: 10px;
  ${(p) => {
    if (p.borderDirection === "left") {
      return css`
        border-left: ${p.open ? "1px" : 0} solid black;
      `;
    }
    return css`
      border-right: ${p.open ? "1px" : 0} solid black;
    `;
  }}
`;

export const SliderParent = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: stretch;
  height: 100%;
`;
