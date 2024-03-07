import Head from "next/head";

export default function FileHeader({ appPath, title, keywords, description }) {
  return (
    <Head>
      <title key="title">{title}</title>
      <link rel="icon" type="image/png" href="/lyre-08.png" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        key="keywords"
        name="keywords"
        content={`apello, apello.org, ${keywords}`}
      />
      <meta key="description" name="description" content={description} />
      <meta key="og-title" property="og:title" content={title} />
      <meta
        property="og:image"
        key="og:image"
        content="https://apello.org/og-image.jpg"
      />
      <meta
        key="og-description"
        property="og:description"
        content={description}
      />
      <meta
        key="og-url"
        property="og:url"
        content={`https://apello.org${appPath}`}
      />
      <meta key="twitter-title" name="twitter:title" content={title} />
      <meta
        key="twitter-description"
        name="twitter:description"
        content={description}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@apello_app" />
      <meta name="twitter:image" content="https://apello.org/og-image.jpg" />
    </Head>
  );
}
