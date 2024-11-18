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
        data-bs-theme="dark"
      >
        <Head>
          {/* External Stylesheets */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Orbitron|Source+Sans+Pro&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://jerejunttila.fi/static/site.min.css"
          />
          {/* set initial clientside to avoid flashing default theme */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-bs-theme', theme);
                })();
              `,
            }}
          />
        </Head>
        <body className="d-flex flex-column h-100 flex">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
