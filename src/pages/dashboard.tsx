import React from "react";
import {
  getAccessToken,
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";

import { OmittedPage, transformPageToOmittedPage } from "../models/page";
import ProjectPreview from "../components/commons/projectPreview";

import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import axios from "axios";

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

  const createPage = async () => {
    const createResponse = await axios.post("/api/pages", {
      title: "새 페이지",
    });

    window.location.reload();
  };

  return (
    <Grid rows="3" columns={2}>
      {pages.map((page) => (
        <ProjectPreview key={page.uuid} project={page} />
      ))}
      <AddNewProject>
        <button className="add_btn" onClick={createPage}>
          <i className="plus icon" />
        </button>

        <div className="add_title">새로운 페이지 시작하기</div>
      </AddNewProject>
    </Grid>
  );
};

export const getServerSideProps = withPageAuthRequired<DashboardProps>({
  async getServerSideProps(context) {
    // Getting user data from Auth0
    const user = getSession(context.req, context.res)?.user;
    const accessToken = await (
      await getAccessToken(context.req, context.res)
    ).accessToken;

    const apiPort = process.env.API_PORT || 8000;
    const response = await axios.get(`http://localhost:${apiPort}/pages`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Pass user and page data to render method
    return {
      props: {
        user: user,
        pages: response.data.map(transformPageToOmittedPage),
      },
    };
  },
});

export default Dashboard;

const AddNewProject = styled.div`
  width: 500px;
  height: 350px;
  margin: 5% 0 0 6%;
  // border: 1px solid black;

  & > .add_btn {
    width: 100%;
    height: 65%;
    border: 2px solid gray;

    &:hover {
      color: teal;
      border: 2px solid teal;
      background-color: lightblue;
    }
  }

  & > .add_title {
    margin-top: 4%;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
`;
