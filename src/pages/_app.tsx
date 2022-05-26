import type { AppProps } from "next/app";
import Head from "next/head";
// import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalStyle";
import Layout from "../components/layout/index";
import { UserProvider } from "@auth0/nextjs-auth0";

import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

function SumitApp({ Component, pageProps }: AppProps) {
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
      </QueryClientProvider>
    </>
  );
}

export default SumitApp;
