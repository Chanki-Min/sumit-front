import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";

const Layout: React.FC = (props) => {
  const { user } = useUser();

  return (
    <>
      <Header />
      <LayoutContent>{props.children} </LayoutContent>
    </>
  );
};

export default Layout;

const LayoutContent = styled.section`
  position: relative;
  width: 100%;
  margin-top: 60px;
  padding: 0.05px; // to disable margin collapsing
  height: calc(100% - 60px);
`;
