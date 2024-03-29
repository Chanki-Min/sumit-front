import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src="https://kit.fontawesome.com/36d7278b8e.js"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body
          style={{
            paddingTop: "70px",
            position: "relative",
            minHeight: "100%",
          }}
        >
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
