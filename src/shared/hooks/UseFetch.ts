import { useState, useEffect } from 'react';

function useFetch(url: string) {
  const [data, setData] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isRefetch, setIsRefetch] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError('Status is not 200');
        setData(null);
      }
      else {
        setError('');
        const jsonData = await response.json();
        setData(jsonData);
      }
    } catch (error) {
      setError('Fetch failed');
      setData(null);
    } finally {
      setLoading(false);
      setIsRefetch(false);
    }
  };

  useEffect(() => {
    if (isRefetch) {
      fetchData();
    }
  }, [isRefetch]);

  const refetch = () => {
    setIsRefetch(true);
  }

  return { data, refetch, error, loading };
}
