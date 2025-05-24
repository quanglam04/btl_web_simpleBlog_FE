import { useState } from "react";

const usePostListHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/post/getAll");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching the data.");
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
  };
};
export default usePostListHook;
