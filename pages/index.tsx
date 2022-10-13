import {
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { GetStaticProps } from "next";
import groq from "groq";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import BlockContent from "../components/BlockContent";
import { client } from "../lib/sanity/client";
import { urlFor } from "../lib/sanity/urlFor";
import { IconArrowRight } from "@tabler/icons";

const Index = ({ alumni }) => {
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

          <SimpleGrid
            breakpoints={[
              { cols: 1 },
              { minWidth: "xs", cols: 2 },
              { minWidth: "lg", cols: 4 },
            ]}
          >
            NYI
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const alumni = await client.fetch(groq`*[_type == "alumn"]`);

  return {
    props: {
      alumni,
    },
    revalidate: 10,
  };
};

export default Index;
