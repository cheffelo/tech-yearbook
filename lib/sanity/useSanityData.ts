import { useEffect, useState } from "react";
import client from "./client";

export default function useSanityData(query: string, params: any) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.fetch(query, params);
        setData(res);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, params]);

  return { data, error, loading };
}
