import sanityClient from "@sanity/client";

export const client = (args: { preview?: boolean } = {}) =>
  sanityClient({
    projectId: "kypq78ay",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-08-29",
    token: args.preview
      ? "skqog6hgloqWHXBahWtCjI6l5fEVp0bxFAZ2qX3nRM9rUrcG7kR6HfFnUFe0uQ56G8vQTpiRQZkEhKzsCpHpQvveLBhiRKpc83mYI21i7HQ7HDMAf4o0vTrLf8f1VZu9JrrShYiw7W98nYsmzOEstbr7H2piKlgGaVYbIHjSnngAjXF60yH6"
      : undefined,
  });
