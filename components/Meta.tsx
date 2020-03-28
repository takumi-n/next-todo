import React from "react";
import Head from "next/head";

export default React.memo(() => {
  const title = "next-todo";
  const description = "next-todo は Next.js で作られたTODOリストです";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width"></meta>
        <title>{title}</title>
      </Head>
    </>
  );
});
