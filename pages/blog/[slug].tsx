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
  post: any;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Alumn: NextPage<Props> = ({ post }) => {
  if (!post) {
    return null;
  }

  const { body, title, mainImage } = post;

  return (
    <>
      <Head>
        <title>{title}</title>
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
        {title}
      </Title>

      <Grid justify="start">
        <Grid.Col sm={6}>
          <Card radius="md">
            <Card.Section>
              <Image
                alt={title}
                src={urlFor(mainImage).url()}
                layout="responsive"
                width={2}
                height={3}
                objectFit="cover"
              />
            </Card.Section>
          </Card>
        </Grid.Col>

        <Grid.Col sm={6}>
          <Card p="lg" radius="lg" mb="sm">
            <Text>
              <BlockContent value={body} />
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = await client().fetch<Params[]>(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
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
  const post = await client({ preview }).fetch(
    groq`*[_type == "post" && slug.current == $slug]|order(_updatedAt desc)[0]`,
    { slug: params.slug || "" }
  );

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

export default Alumn;
