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
  Image as MantineImage,
  Grid,
  Group,
  List,
  Text,
  Title,
} from "@mantine/core";

import { IconArrowLeft } from "@tabler/icons";
import { Carousel } from "@mantine/carousel";

interface Props {
  alumn: any;
  images: any;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Alumn: NextPage<Props> = ({ alumn, images }) => {
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
                src={
                  image
                    ? urlFor(image).url()
                    : "https://via.placeholder.com/512x768"
                }
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
            <Title order={2} mb="md">
              Bio
            </Title>
            <Text>{bio ? <BlockContent value={bio} /> : <em>No bio</em>}</Text>
          </Card>

          <Card p="lg" radius="lg">
            <Title order={2} mb="md">
              Q&A
            </Title>
            <List listStyleType="none">
              {questionnaire.map((d) => {
                const { question, answer } = d;

                return (
                  <List.Item key={d._key}>
                    <Text size="lg">
                      <strong>{question}</strong>
                    </Text>
                    <BlockContent value={answer} />
                  </List.Item>
                );
              })}
            </List>
          </Card>
        </Grid.Col>

        {images.length > 0 && (
          <Grid.Col sm={12}>
            <Title order={2} mb="lg">
              Images with {name}
            </Title>
            <Card p="lg" radius="lg">
              <Carousel align="center" slideGap="md" withIndicators loop>
                {images.map((image) => (
                  <Carousel.Slide size="100%" key={image._id}>
                    <MantineImage
                      alt={image.altText}
                      src={image.url}
                      width={500 * image.metadata.dimensions.aspectRatio}
                      height={500}
                      radius="lg"
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Card>
          </Grid.Col>
        )}
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

  const images = await client({ preview }).fetch(
    groq`*[_type == "sanity.imageAsset" && references($tagRef)]`,
    { tagRef: alumn.tag._ref }
  );

  return {
    props: {
      alumn,
      images,
    },
    revalidate: 10,
  };
};

export default Alumn;
