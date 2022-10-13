import { GetStaticProps } from "next";
import groq from "groq";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";

import BlockContent from "../components/BlockContent";
import { client } from "../lib/sanity/client";
import { urlFor } from "../lib/sanity/urlFor";
import { IconArrowRight } from "@tabler/icons";
import { useState } from "react";

const Index = ({ alumni, gallery }) => {
  return (
    <>
      <Head>
        <title>We are Tech</title>
      </Head>

      <Container>
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
              { cols: 1 },
              { minWidth: "xs", cols: 2 },
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
                  size={`${Math.floor(
                    image.asset.metadata.dimensions.aspectRatio * 67
                  )}%`}
                  key={image._id}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={image.alt}
                    src={urlFor(image).width(720).quality(75).url()}
                    width={Math.floor(
                      image.asset.metadata.dimensions.aspectRatio * 500
                    )}
                    height={500}
                    loading="lazy"
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        </Stack>
      </Container>
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
