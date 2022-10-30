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
import { Grid } from "semantic-ui-react";
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
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="검색어를 입력하세요"
        value={searchInput}
      />
      <button
        onClick={() => {
          replace({
            query: {
              query: searchInput,
            },
          });
        }}
      >
        검색
      </button>
      <Grid rows="3" columns={2}>
        {pages.map((page) => (
          <ProjectPreview key={page.uuid} project={page} />
        ))}
      </Grid>
    </>
  );
};

export default Search;
