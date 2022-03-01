import type { AppProps } from "next/app";
import Head from "next/head";
// import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalStyle";

function SumitApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>boilerplate</title>
      </Head>
      <GlobalStyle />
      {/* <ThemeProvider> */}
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </>
  );
}

export default SumitApp;
