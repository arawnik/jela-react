import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html
        lang="en"
        className="h-100"
      >
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="TODO."
          />
          <meta
            name="keywords"
            content="TODO"
          />
          <meta
            name="author"
            content=""
          />
          <meta
            property="og:title"
            content="TODO"
          />
          <meta
            property="og:description"
            content="TODO"
          />
          <meta
            property="og:image"
            content="/static/og-image.png"
          />
          <meta
            property="og:url"
            content="https://www.jerejunttila.fi"
          />
          <link
            rel="icon"
            href="/favicon.ico"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
