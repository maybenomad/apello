import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(api, query, page, param) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, isHasMore] = useState(false);

  useEffect(() => {
      setList([]);
  },[query]);
  const sendQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${api}?name=${query}&page=${page}${param}`);
      console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${api}`)
      const {hasMore, data} = res.data;
      console.log(page,data)
      setList((prev) => [ ...new Set([...prev, ...data]) ] );
      isHasMore(hasMore)
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [query, page, api]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);
  

  return { loading, error, list , hasMore };
}

export default useFetch;