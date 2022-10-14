import groq from "groq";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

import BlockContent from "../../components/BlockContent";

import { client } from "../../lib/sanity/client";
import { urlFor } from "../../lib/sanity/urlFor";
import {
  Blockquote,
  Card,
  Container,
  Grid,
  Group,
  List,
  Text,
  Title,
} from "@mantine/core";

import { IconArrowLeft } from "@tabler/icons";

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

      <Text size="sm" mb="lg">
        <Link href="/" passHref>
          <a>
            <Group align="center">
              <IconArrowLeft style={{ color: "black" }} /> Back
            </Group>
          </a>
        </Link>
      </Text>

      <Title order={1} mb="lg">
        {name}
      </Title>

      <Grid justify="start">
        <Grid.Col sm={6}>
          <Card radius="md">
            <Card.Section>
              <Image
                alt={name}
                src={urlFor(image).url()}
                layout="responsive"
                width={2}
                height={3}
                objectFit="cover"
              />
            </Card.Section>

            <Blockquote>
              <Text size="lg" weight="bold">
                You miss 100% of the shots you don&apos;t take. - Wayne Gretzky
              </Text>
              <Text size="sm" weight="bold" align="right">
                - Michael Scott
              </Text>
              <Text size="xs" weight="bold" align="right">
                - {name}
              </Text>
            </Blockquote>
          </Card>
        </Grid.Col>

        <Grid.Col sm={6}>
          <Card p="lg" radius="lg" mb="sm">
            <Text>
              <BlockContent value={bio} />
            </Text>
          </Card>

          <Card p="lg" radius="lg">
            <List>
              {questionnaire.map((d) => {
                const { question, answer } = d;

                return (
                  <List.Item key={d._key}>
                    <Text size="lg">{question}</Text>
                    <BlockContent value={answer} />
                  </List.Item>
                );
              })}
            </List>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = await client().fetch<Params[]>(
    groq`*[_type == "alumn" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params = {},
  preview,
}) => {
  const alumn = await client({ preview }).fetch(
    groq`*[_type == "alumn" && slug.current == $slug]|order(_updatedAt desc)[0]{ ..., questionnaire[]{ ... } }`,
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
