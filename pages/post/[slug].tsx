import groq from "groq";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import client from "../../lib/sanity/client";

interface Props {
  post: any;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Alumn: NextPage<Props> = ({ post }) => {
  return <div>{JSON.stringify(post)}</div>;
};

export const getStaticPaths = async () => {
  const paths = await client.fetch<Params[]>(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]
  `,
    { slug: params.slug || "" }
  );

  return {
    props: {
      post,
    },
  };
};

export default Alumn;
