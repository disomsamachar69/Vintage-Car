import "@/styles/globals.css";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Vintage Car</title>
        <meta name="description" content="A collection of beautiful vintage car photos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add additional SEO meta tags here */}
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
