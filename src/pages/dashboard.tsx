import {
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import fetchPages from "../api/fetchPage";
import { OmittedPage, transformPageToOmittedPage } from "../models/page";
import ProjectPreview from "../components/layout/projectPreview";

import { Card, Grid, Icon } from "semantic-ui-react";

interface DashboardProps {
  user?: UserProfile;
  // pages: Omit<Page, 'slides'>[];
  pages: OmittedPage[];
}
/**
 * /dashboard 페이지
 * @author ck.min
 * @returns NextPage
 */
const Dashboard = ({ user, pages }: DashboardProps) => {
  if (!Array.isArray(pages) || !user) {
    return <></>;
  }

  //   console.log(pages, user);

  return (
    <Grid>
      {/* cK.min 임의로 row=3 으로 변경했습니다 */}
      <Grid rows="3">
        {pages.map((page) => {
          // CK.MIN: map function을 culry brace ({}) 로 감싼 경우, 명시적으로 return 문장이 필요합니다.
          //이게 마음에 들지 않는다면 이 전체 jsx 평가식을 아래로 수정하세요
          /*
			{pages.map((page) => (
			<ProjectPreview key={page.uuid} project={page} />
			))} 
		 */
          return <ProjectPreview key={page.uuid} project={page} />;
        })}

        <Card>
          <Icon name="plus" />
          <Card.Content>
            <Card.Header>새로운 페이지 시작하기</Card.Header>
          </Card.Content>
        </Card>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = withPageAuthRequired<DashboardProps>({
  async getServerSideProps(context) {
    // Getting user data from Auth0
    const user = getSession(context.req, context.res)?.user;
    const pages = await fetchPages({ withSlides: false });

    // Pass user and page data to render method
    return {
      props: {
        user: user,
        pages: pages.map(transformPageToOmittedPage),
      },
    };
  },
});

export default Dashboard;
