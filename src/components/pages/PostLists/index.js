import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import usePostListHook from "./usePostListsHook";

export default function PostLists() {
  const { data, fetchData } = usePostListHook();
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul>
      {data.map((d) => (
        <li key={d.slug}>
          <Link to={`/posts/${d.slug}`}>
            <h3>{d.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
