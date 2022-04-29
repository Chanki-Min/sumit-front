import type { NextPage } from "next";
import styled from "styled-components";
import LoginSection from "../components/main/LoginSection";

const Home: NextPage = () => {
  return (
    <>
      <LeftWing>
        <LoginSection />
      </LeftWing>
    </>
  );
};

export default Home;

const LeftWing = styled.section`
  display: block;
  width: 300px;
  height: calc(100vh - 60px);
  background-color: lightgray;
`;
