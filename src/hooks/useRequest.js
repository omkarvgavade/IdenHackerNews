import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useRequest = (url, options = {}) => {
  const { pageSize = 30 } = options;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allIds, setAllIds] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setAllIds(response.data || []);

        const initialIds = response.data.slice(0, pageSize);
        const itemPromises = initialIds.map((id) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        );

        const itemResponses = await Promise.all(itemPromises);
        setData(itemResponses.map((res) => res.data));
        setHasMore(response.data.length > pageSize);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
    return () => {
      setData([]);
      setPage(1);
      setHasMore(true);
    };
  }, [url, pageSize]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;
      const nextIds = allIds.slice(startIndex, endIndex);

      if (nextIds.length === 0) {
        setHasMore(false);
        return;
      }

      const itemPromises = nextIds.map((id) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      );

      const itemResponses = await Promise.all(itemPromises);
      const newItems = itemResponses.map((res) => res.data);

      setData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
      setHasMore(endIndex < allIds.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page, pageSize, allIds]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
