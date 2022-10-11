import groq from "groq";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import client from "../../lib/sanity/client";

interface Props {
  alumn: any;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Alumn: NextPage<Props> = ({ alumn }) => {
  return <div>{JSON.stringify(alumn)}</div>;
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
    `
    *[_type == "alumn" && slug.current == $slug][0]
  `,
    { slug: params.slug || "" }
  );

  console.log("alumn", alumn);

  return {
    props: {
      alumn,
    },
  };
};

export default Alumn;
