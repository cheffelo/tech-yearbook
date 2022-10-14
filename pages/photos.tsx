import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import groq from "groq";

import { Box, Card, Container, Grid, Group, Text } from "@mantine/core";

import { motion } from "framer-motion";

import { client } from "../lib/sanity/client";
import { urlFor } from "../lib/sanity/urlFor";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons";
import { MouseEvent, useState } from "react";

const Photos = ({ gallery }) => {
  return (
    <>
      <Head>
        <title>Photos</title>
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

      <Box sx={{ columnCount: 2, columnGap: 16 }}>
        {gallery.images.map((image) => (
          <Card
            key={image._key}
            id={image._key}
            radius="lg"
            shadow="sm"
            component={motion.div}
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            mb="lg"
          >
            <Card.Section>
              <Image
                src="null"
                loader={({ width }) => urlFor(image).width(width).url()}
                width={image.asset.metadata.dimensions.width}
                height={image.asset.metadata.dimensions.height}
                layout="responsive"
                alt={image.alt}
                objectFit="cover"
              />
            </Card.Section>
            <Text mt="sm" size="sm">
              {image.caption}
            </Text>
          </Card>
        ))}
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const gallery = await client({ preview }).fetch(
    groq`*[_type == "gallery" && slug.current == "main-gallery"]|order(_updatedAt desc)[0]{ ..., images[]{..., asset->{...} } }`
  );

  return {
    props: {
      gallery,
    },
    revalidate: 10,
  };
};

export default Photos;
