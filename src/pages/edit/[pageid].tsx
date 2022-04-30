import {
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { useState } from "react";
import styled from "styled-components";
import BlockDraggerSidebar from "../../components/edit/BlockDraggerSiderbar";
import MenuBar from "../../components/edit/MenuBar";
import SlidesSelectionSidebar from "../../components/edit/SlidesSelectionSidebar";
import { SliderParent } from "../../styles/Sidebar";

interface PageProps {
  user?: UserProfile;
}

const EditPage = ({ user }: PageProps) => {
  const [showLeftSidebar, setShowLeftSidebar] = useState<boolean>(true);
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(true);

  return (
    <>
      <MenuBar
        leftBarVisible={showLeftSidebar}
        setLeftBarVisible={setShowLeftSidebar}
        rightBarVisible={showRightSidebar}
        setRightBarvisible={setShowRightSidebar}
      />

      <SliderParent>
        <SlidesSelectionSidebar visible={showLeftSidebar} />
        <EditArea>abc</EditArea>
        <BlockDraggerSidebar visible={showRightSidebar} />
      </SliderParent>
    </>
  );
};

const EditArea = styled.div`
  flex: 1 1;
  height: 100%;
  padding: 20px 20px 0 20px;
`;

export const getServerSideProps = withPageAuthRequired<PageProps>({
  async getServerSideProps(context) {
    // Getting user data from Auth0
    const user = getSession(context.req, context.res)?.user;

    // Pass user to render method
    return {
      props: {
        user: user,
      },
    };
  },
});

export default EditPage;
