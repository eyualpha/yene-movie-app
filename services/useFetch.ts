import { useCallback, useRef, useState } from "react";

const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch: boolean = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  // Keep latest fetch function without triggering effects
  const fetchRef = useRef(fetchFunction);
  fetchRef.current = fetchFunction;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchRef.current();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    reset,
  };
};

export default useFetch;
