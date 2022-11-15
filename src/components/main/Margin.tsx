import { ReactNode } from 'react';
import styled from 'styled-components';

const Margin = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Margin;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 18px;
  box-sizing: border-box;
  max-width: 836px;
  /* border: 1px solid red; */
  margin: 0 auto;
`;