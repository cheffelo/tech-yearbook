import groq from "groq";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
import { motion, AnimatePresence } from "framer-motion";

import BlockContent from "../../components/BlockContent";

import client from "../../lib/sanity/client";
import { urlFor } from "../../lib/sanity/urlFor";

interface Props {
  alumn: any;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Alumn: NextPage<Props> = ({ alumn = {} }) => {
  const { name, questionnaire = [], bio, image } = alumn;

  if (!alumn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <AnimatePresence>
        <Container style={{ padding: "3rem 0 6rem 0" }}>
          <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
          >
            <Header as="h1">{name}</Header>
          </motion.div>

          <Segment
            as={motion.div}
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
            piled
          >
            <Grid stackable columns={2}>
              <Grid.Column style={{ position: "relative", minHeight: "24rem" }}>
                <Image
                  src={urlFor(image).url()}
                  layout="fill"
                  objectFit="cover"
                />
              </Grid.Column>
              <Grid.Column>
                <p>
                  <BlockContent blocks={bio} />
                </p>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment>
            <List divided>
              {questionnaire.map((d) => {
                const { question, answer } = d;

                return (
                  <List.Item style={{ margin: "1rem 0" }} key={d._key}>
                    <List.Content>
                      <List.Header style={{ margin: "1rem 0" }}>
                        {question}
                      </List.Header>

                      <BlockContent blocks={answer} />
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Segment>
        </Container>
      </AnimatePresence>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = await client.fetch<Params[]>(
    groq`*[_type == "alumn" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const alumn = await client.fetch(
    groq`*[_type == "alumn" && slug.current == $slug][0]{ ..., questionnaire[]{ ... } }`,
    { slug: params.slug || "" }
  );

  return {
    props: {
      alumn,
    },
    revalidate: 10,
  };
};

export default Alumn;
