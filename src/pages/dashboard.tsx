import {
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import fetchPages from "../api/fetchPage";
import { Page } from "../models/page";

import { Container, Grid, Image, Segment } from "semantic-ui-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Link from "next/link";

interface DashboardProps {
  user?: UserProfile;
  pages: Omit<Page, "slides">[];
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

  return (
    // 페이지 이미지 출력 uuid넘버대로 나오도록, title 이미지 밑에, description title 밑에나오도록, 태그항목(이미지)
    // 페이지 이미지(미리보기)위에 share 여부에 따라 이미지 다르게 
    // 페이지 title 옆에 드롭다운 기능 구현하기
    // 마지막 페이지는 무조건 새로운 페이지 시작하기로 만들기(추가 버튼구현)
    <Grid>
      <Grid.Row columns="3" stretched>
        {pages.map((page) => (
          <Link key={page.uuid} href={`/edit/${page.uuid}`} passHref>
            <Segment vertical>
              <SyntaxHighlighter
                language="json"
                style={docco}
                customStyle={{ marginRight: "10px" }}
              >
                {JSON.stringify(page, null, 2)}
              </SyntaxHighlighter>
            </Segment>
          </Link>
        ))}
      </Grid.Row>
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
        pages: pages,
      },
    };
  },
});

export default Dashboard;