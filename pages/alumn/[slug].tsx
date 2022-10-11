import groq from "groq";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { Container, Divider, Grid, Header, Segment } from "semantic-ui-react";
import BlockContent from "../../components/BlockContent";

import client from "../../lib/sanity/client";
import { urlFor } from "../../lib/sanity/urlFor";

interface Props {
  alumn: any;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Alumn: NextPage<Props> = ({ alumn }) => {
  const { name, questionnaire = [], bio, image } = alumn;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <Container style={{ marginTop: "3rem" }}>
        <Header as="h1">{name}</Header>
        <Segment>
          <Grid stackable columns={2}>
            <Grid.Column style={{ position: "relative", minHeight: "24rem" }}>
              <Image
                src={urlFor(alumn.image).url()}
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
          <Grid stackable columns={1}>
            {questionnaire.map((d) => {
              const { question, answer } = d;

              return (
                <Grid.Column key={d._key}>
                  <p>
                    <strong>{question}</strong>
                  </p>

                  <p>
                    <BlockContent blocks={answer} />
                  </p>
                </Grid.Column>
              );
            })}
          </Grid>
        </Segment>
      </Container>
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
