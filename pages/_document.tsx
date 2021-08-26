import React from 'react';
import { extractStyles } from 'evergreen-ui';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default // @ts-ignore
class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext) {
    const page = ctx.renderPage();
    const { css, hydrationScript } = extractStyles();

    return {
      ...page,
      css,
      hydrationScript,
    };
  }

  render() {
    // @ts-ignore
    const { css, hydrationScript } = this.props;

    return (
      <Html>
        <Head>
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </Html>
    );
  }
}
