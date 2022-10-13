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
                        <BlockContent blocks={alumn.bio} />
                      </Text>
                    </Group>
                  </Card>
                </a>
              </Link>
            ))}
          </SimpleGrid>

          <Group position="apart">
            <Title order={2}>Gallery</Title>
            <Text size="sm">
              <Link href="/gallery" passHref>
                <a>
                  <Group align="center">
                    See all <IconArrowRight style={{ color: "black" }} />
                  </Group>
                </a>
              </Link>
            </Text>
          </Group>

          <Carousel
            height={400}
            slideSize="70%"
            align="center"
            slideGap="md"
            loop
            dragFree
            withIndicators
          >
            {gallery.images.map((image) => (
              <Carousel.Slide key={image._id}>
                <Stack
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Image
                    alt={image.alt}
                    src="null"
                    loader={({ width }) =>
                      urlFor(image).width(width).quality(75).url()
                    }
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center center"
                  />
                  {image.caption && (
                    <Text
                      style={{
                        zIndex: 10,
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        padding: "0.5rem",
                        // frosted background
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {image.caption}
                    </Text>
                  )}
                </Stack>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Stack>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const alumni = await client({ preview }).fetch(groq`*[_type == "alumn"]`);
  const gallery = await client({ preview }).fetch(
    groq`*[_type == "gallery" && slug.current == "main-gallery"]|order(_updatedAt desc)[0]`
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
