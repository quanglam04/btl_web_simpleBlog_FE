import { useState } from "react";
import { useNavigate } from "react-router-dom";

const usePostHook = () => {
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  const handleDeletePost = async (slug) => {
    try {
      await fetch("http://localhost:8080/api/post/delete/" + slug, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      alert(`Xóa thành công bài viết với slug: ${slug}`);
    } catch (error) {
      console.error("Xóa thất bại:", error);
    }

    navigate("/posts");
  };

  const fetchData = async (slug) => {
    try {
      const response = await fetch("http://localhost:8080/api/post/" + slug);
      const result = await response.json();
      setPost(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    handleDeletePost,
    setPost,
    post,
    fetchData,
  };
};

export default usePostHook;
