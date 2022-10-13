import type { AppProps } from "next/app";
import Head from "next/head";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import Layout from "../components/Layout";
import { RouterTransition } from "../components/RouterTransition";

import "../global.css";

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
        <ModalsProvider>
          <RouterTransition />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
