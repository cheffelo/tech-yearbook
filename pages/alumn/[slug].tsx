import groq from "groq";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import BlockContent from "../../components/BlockContent";

import client from "../../lib/sanity/client";

interface Props {
  alumn: any;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Alumn: NextPage<Props> = ({ alumn }) => {
  const { name, questionnaire = [], bio } = alumn;

  return (
    <article>
      <h1>{name}</h1>
      <p>
        <BlockContent blocks={bio} />
      </p>
      {questionnaire.map((d) => {
        const { question, answer } = d;

        return (
          <div key={d._key}>
            <h2>PLACEHOLDER</h2>
            <p>
              <BlockContent blocks={answer} />
            </p>
          </div>
        );
      })}
    </article>
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
  };
};

export default Alumn;
