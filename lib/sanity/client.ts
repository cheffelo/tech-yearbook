import sanityClient from "@sanity/client";

export const client = (args: { preview?: boolean } = {}) =>
  sanityClient({
    projectId: "kypq78ay",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-08-29",
    token: args.preview
      ? process.env.NEXT_PUBLIC_SANITY_PREVIEW_TOKEN
      : undefined,
  });
