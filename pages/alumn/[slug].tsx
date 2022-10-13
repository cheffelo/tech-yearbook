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
  Divider,
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

      <Container>
        <Text size="sm">
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
                  You miss 100% of the shots you don&apos;t take. - Wayne
                  Gretzky
                </Text>
                <Text size="sm" weight="bold" align="right">
                  - Michael Scott
                </Text>
              </Blockquote>
            </Card>
          </Grid.Col>

          <Grid.Col sm={6}>
            <Card p="lg" radius="lg" mb="sm">
              <Text>
                <BlockContent blocks={bio} />
              </Text>
            </Card>

            <Card p="lg" radius="lg">
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
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
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
