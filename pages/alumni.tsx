import { Card, Container, Group, SimpleGrid, Text, Title } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import groq from "groq";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import BlockContent from "../components/BlockContent";
import { client } from "../lib/sanity/client";
import { urlFor } from "../lib/sanity/urlFor";

const Alumni = ({ alumni }) => {
  return (
    <>
      <Head>
        <title>Alumni</title>
      </Head>

      <Container>
        <Title order={1} my="lg">
          Alumni
        </Title>

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

export default Alumni;
