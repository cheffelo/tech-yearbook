import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import groq from "groq";

import {
  Box,
  Card,
  Container,
  Grid,
  Group,
  Overlay,
  Text,
} from "@mantine/core";

import { motion } from "framer-motion";

import { client } from "../lib/sanity/client";
import { urlFor } from "../lib/sanity/urlFor";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons";
import { MouseEvent, useState } from "react";
import { closeAllModals, openModal } from "@mantine/modals";

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

      <Box
        sx={{ "@media (min-width: 768px)": { columnCount: 2 }, columnGap: 16 }}
      >
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
            style={{
              cursor: "pointer",
              background: "rgb(32,32,32)",
              color: "white",
            }}
            role="button"
            onClick={() =>
              openModal({
                fullScreen: true,
                padding: 0,
                withCloseButton: false,
                styles: {
                  modal: {
                    background: "transparent",
                  },
                },
                children: (
                  <>
                    <div
                      style={{
                        width: "100vw",
                        height: "100vh",
                        position: "relative",
                      }}
                      onClick={closeAllModals}
                    >
                      <Overlay zIndex={99} blur={5} color="black" />
                      <Image
                        src="null"
                        loader={({ width }) => urlFor(image).width(width).url()}
                        layout="fill"
                        objectFit="contain"
                        alt={image.alt}
                        style={{ zIndex: 100 }}
                        loading="lazy"
                      />
                    </div>
                  </>
                ),
              })
            }
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
