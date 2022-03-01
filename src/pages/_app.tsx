import type { AppProps } from "next/app";
import Head from "next/head";
// import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalStyle";
import Layout from "../components/layout/index";
import { UserProvider } from "@auth0/nextjs-auth0";

function SumitApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>boilerplate</title>
      </Head>
      <GlobalStyle />
      {/* <ThemeProvider> */}
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
      {/* </ThemeProvider> */}
    </>
  );
}

export default SumitApp;
