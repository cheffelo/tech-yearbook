import groq from "groq";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";

import { motion, AnimatePresence } from "framer-motion";

import BlockContent from "../../components/BlockContent";

import { client } from "../../lib/sanity/client";
import { urlFor } from "../../lib/sanity/urlFor";
import {
  Box,
  Container,
  Group,
  List,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

interface Props {
  alumn: any;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Alumn: NextPage<Props> = ({ alumn }) => {
  if (!alumn) {
    return null;
  }

  const { name, questionnaire = [], bio, image } = alumn;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <AnimatePresence>
        <Container py={6}>
          <Title order={1} my="lg">
            {name}
          </Title>

          <SimpleGrid breakpoints={[{ cols: 1 }, { minWidth: "xs", cols: 2 }]}>
            <div style={{ position: "relative" }}>
              <Image
                alt={name}
                src={urlFor(image).url()}
                layout="responsive"
                width={2}
                height={3}
                objectFit="contain"
              />
            </div>

            <Text>
              <BlockContent blocks={bio} />
            </Text>
          </SimpleGrid>

          <Group>
            <List>
              {questionnaire.map((d) => {
                const { question, answer } = d;

                return (
                  <List.Item key={d._key}>
                    <Text size="lg">{question}</Text>
                    <BlockContent blocks={answer} />
                  </List.Item>
                );
              })}
            </List>
          </Group>
        </Container>
      </AnimatePresence>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = await client.fetch<Params[]>(
    groq`*[_type == "alumn" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const alumn = await client.fetch(
    groq`*[_type == "alumn" && slug.current == $slug][0]{ ..., questionnaire[]{ ... } }`,
    { slug: params.slug || "" }
  );

  return {
    props: {
      alumn,
    },
    revalidate: 10,
  };
};

export default Alumn;
