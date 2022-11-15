import React, { useEffect, useState } from "react";
import {
  getAccessToken,
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";

import { OmittedPage, Page, transformPageToOmittedPage } from "../models/page";
import ProjectPreview from "../components/commons/projectPreview";

import styled from "styled-components";
import { Grid, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import { useRouter } from "next/router";

/**
 * /dashboard 페이지
 * @author ck.min
 * @returns NextPage
 */
const Search = () => {
  const { query, isReady, replace } = useRouter();

  const [pages, setPages] = useState<Page[]>([]);
  const [searchInput, setSearchInput] = useState<string>();

  useEffect(() => {
    if (
      !isReady ||
      typeof query.query !== "string" ||
      query.query.length === 0
    ) {
      return;
    }
    setSearchInput(query.query);

    const search = async () => {
      const res = await axios.get("/api/pages/search", {
        params: {
          query: query.query,
        },
      });
      setPages(res.data);
    };
    search();
  }, [isReady, query]);

  return (
    <>
      <SearchBar>
        <Button size="medium" className="search_btn">
          <Button.Content visible>
            <Icon size="small" name="search" />
          </Button.Content>
        </Button>

        <span className="ui input">
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="검색어를 입력하세요..."
            value={searchInput}
          />
        </span>

        <Button
          size="medium"
          className="search_btn"
          onClick={() => {
            replace({
              query: {
                query: searchInput,
              },
            });
          }}
        >
          <Button.Content hidden>
            <Icon size="small" name="arrow right" />
          </Button.Content>
        </Button>
      </SearchBar>
      <Grid rows="3" columns={2}>
        {pages.map((page) => (
          <ProjectPreview key={page.uuid} project={page} viewOnly />
        ))}
      </Grid>
    </>
  );
};

export default Search;

const SearchBar = styled.div`
  width: 500px;
  height: auto;
  margin: 20px auto 0 auto;
  border-bottom: 2px solid gray;
  display: flex;
  justify-content: space-between;
  & > .ui.input {
    /* width: 430px; */
    border: none;
    flex: 1 50px;

    & > input {
      border: none;
    }
  }

  & > .search_btn {
    flex: 0 0 30px;
    margin: 0 0 0 5px;
    padding: 0;
    background-color: transparent !important;
  }
`;
