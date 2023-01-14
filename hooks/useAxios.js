import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useAxios() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  
  

  const getItems = async(url)=> {
    try {
        setLoading(true);
        setError(false);
        const res = await axios.get(url);
        const { data } = res;
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
  }
  

  return { loading, error, data , getItems };
}

export default useAxios;