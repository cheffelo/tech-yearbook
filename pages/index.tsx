import { GetStaticProps } from "next";
import groq from "groq";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Image as MantineImage,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import BlockContent from "../components/BlockContent";
import { client } from "../lib/sanity/client";
import { urlFor } from "../lib/sanity/urlFor";

import { IconArrowRight } from "@tabler/icons";

const Index = ({ alumni, gallery }) => {
  return (
    <>
      <Head>
        <title>We are Tech</title>
      </Head>

      <Stack spacing="xl">
        <Group position="apart">
          <Title order={2}>Alumni</Title>
          <Text size="sm">
            <Link href="/alumni" passHref>
              <a>
                <Group align="center">
                  See all <IconArrowRight style={{ color: "black" }} />
                </Group>
              </a>
            </Link>
          </Text>
        </Group>

        <SimpleGrid
          breakpoints={[
            { maxWidth: "xs", cols: 1 },
            { minWidth: "xs", cols: 2 },
            { minWidth: "sm", cols: 3 },
            { minWidth: "md", cols: 4 },
            { minWidth: "lg", cols: 4 },
          ]}
        >
          {alumni.map((alumn) => (
            <Link
              href={`/alumn/${alumn.slug.current}`}
              key={alumn._id}
              passHref
            >
              <a style={{ textDecoration: "none" }}>
                <Card shadow="sm">
                  <Card.Section style={{ position: "relative" }}>
                    <Image
                      alt={alumn.name}
                      src={urlFor(alumn.image).width(768).url()}
                      width={320}
                      height={240}
                      layout="responsive"
                      objectFit="cover"
                    />
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text size="lg" weight="bold">
                      {alumn.name}
                    </Text>
                    <Text size="sm" lineClamp={6}>
                      <BlockContent value={alumn.bio} />
                    </Text>
                  </Group>
                </Card>
              </a>
            </Link>
          ))}
        </SimpleGrid>

        <Group position="apart">
          <Title order={2}>Photos</Title>
          <Text size="sm">
            <Link href="/photos" passHref>
              <a>
                <Group align="center">
                  See all <IconArrowRight style={{ color: "black" }} />
                </Group>
              </a>
            </Link>
          </Text>
        </Group>

        <Carousel align="center" slideGap="md" withIndicators loop>
          {gallery.images.map((image) => {
            return (
              <Carousel.Slide
                size={`clamp(100px, ${Math.floor(
                  image.asset.metadata.dimensions.aspectRatio * 40
                )}%, 300px)`}
                key={image._id}
              >
                <MantineImage
                  alt={image.alt}
                  src={urlFor(image).width(720).quality(75).url()}
                  width={Math.floor(
                    image.asset.metadata.dimensions.aspectRatio * 450
                  )}
                  height={500}
                  radius="lg"
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const alumni = await client({ preview }).fetch(groq`*[_type == "alumn"]`);
  const gallery = await client({ preview }).fetch(
    groq`*[_type == "gallery" && slug.current == "main-gallery"]|order(_updatedAt desc)[0]{ ..., images[]{..., asset->{...} } }`
  );

  return {
    props: {
      alumni,
      gallery,
    },
    revalidate: 10,
  };
};

export default Index;
