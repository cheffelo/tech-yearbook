import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "kypq78ay",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
});
