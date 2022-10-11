import { AnimatePresence } from "framer-motion";
import groq from "groq";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Card, Container, Grid, Header } from "semantic-ui-react";
import BlockContent from "../components/BlockContent";
import client from "../lib/sanity/client";
import { urlFor } from "../lib/sanity/urlFor";

const Alumni = ({ alumni }) => {
  return (
    <>
      <Head>
        <title>Alumni</title>
      </Head>
      <AnimatePresence>
        <Container style={{ padding: "3rem 0 6rem 0" }}>
          <Header as="h1">Alumni</Header>

          <Grid stackable columns={4}>
            {alumni.map((alumn) => (
              <Grid.Column key={alumn._id}>
                <Link href={`/alumn/${alumn.slug.current}`}>
                  <Card as="a">
                    <div style={{ position: "relative", height: "16rem" }}>
                      <Image
                        src={urlFor(alumn.image).width(768).url()}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <Card.Content>
                      <Card.Header>{alumn.name}</Card.Header>
                      <Card.Description
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          height: "8rem",
                          margin: "1rem 0",
                        }}
                      >
                        <BlockContent blocks={alumn.bio} />
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Link>
              </Grid.Column>
            ))}
          </Grid>
        </Container>
      </AnimatePresence>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const alumni = await client.fetch(groq`*[_type == "alumn"]`);

  return {
    props: {
      alumni,
    },
    revalidate: 10,
  };
};

export default Alumni;
