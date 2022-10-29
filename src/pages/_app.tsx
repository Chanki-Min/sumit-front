import type { AppProps } from "next/app";
import Head from "next/head";
// import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalStyle";
import Layout from "../components/layout/index";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ReactQueryDevtools } from "react-query/devtools";

import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enable") {
  require("../../mocks");
}

function SumitApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>boilerplate</title>
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {/* <ThemeProvider> */}
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
          {/* </ThemeProvider> */}
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default SumitApp;
