import type { AppProps } from "next/app";
import Head from "next/head";

import { MantineProvider } from "@mantine/core";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>We Are Tech</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
