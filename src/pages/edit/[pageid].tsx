import {
  getAccessToken,
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import BlockDraggerSidebar from "../../components/edit/BlockDraggerSiderbar";
import Editor from "../../components/edit/Editor";
import MenuBar from "../../components/edit/MenuBar";
import SlidesSelectionSidebar from "../../components/edit/SlidesSelectionSidebar";
import { SliderParent } from "../../styles/Sidebar";
import {
  prefetchPageByIdQuerySsr,
  usePageByIdQuery,
} from "../../api/page/fetchPageByPageUUID";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";

interface PageProps {
  user?: UserProfile;
}

const EditPage = ({ user }: PageProps) => {
  const router = useRouter();

  const pageQuery = usePageByIdQuery(router.query.pageid as string);

  const [showLeftSidebar, setShowLeftSidebar] = useState<boolean>(true);
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(true);

  if (pageQuery.isLoading || pageQuery.isError || pageQuery.isIdle) {
    return <></>;
  }

  return (
    <>
      {/* <MenuBar
        leftBarVisible={showLeftSidebar}
        setLeftBarVisible={setShowLeftSidebar}
        rightBarVisible={showRightSidebar}
        setRightBarvisible={setShowRightSidebar}
      /> */}

      <DndProvider backend={HTML5Backend}>
        <SliderParent>
          {/* <SlidesSelectionSidebar
            visible={showLeftSidebar}
            slides={pageQuery.data.slides}
          /> */}
          <EditArea>
            <Editor rootBlockId={pageQuery.data.slides[0].root_block.uuid} />
          </EditArea>
          <BlockDraggerSidebar visible={showRightSidebar} />
        </SliderParent>
      </DndProvider>
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
    const accessToken = (await getAccessToken(context.req, context.res))
      .accessToken;

    // Prefetch page data
    // TODO: 인증 추가
    const queryClient = new QueryClient();
    const page = await prefetchPageByIdQuerySsr(
      queryClient,
      context.params?.pageid as string,
      accessToken
    );

    // Pass user to render method
    return {
      props: {
        user: user,
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
});

export default EditPage;
