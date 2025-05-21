import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [openFormUpdate, setOpenFormUpdate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDeletePost = async () => {
    // call API xóa

    try {
      const response = await fetch(
        "https://rmgxps-8080.csb.app/api/delete/post/" + slug,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      alert("Xóa thành công bài viết với slug: ", slug);
    } catch (error) {
      console.error("Xóa thất bại:", error);
    }

    navigate("/posts");
  };

  const onSubmit = async (data) => {
    //Call API
    try {
      const response = await fetch(
        "https://rmgxps-8080.csb.app/api/update/post/" + slug,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      setPost(result);
      alert("Cập nhật thành công bài viết với slug: ", slug);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rmgxps-8080.csb.app/api/post/" + slug
        );
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [post]);
  const { title, description } = post;
  return (
    <>
      <div style={{ padding: "10px" }}>
        <div>
          {" "}
          <span style={{ color: "red" }}> Title: </span> {title}{" "}
        </div>
        <div>
          {" "}
          <span style={{ color: "red" }}> Description: </span> {description}{" "}
        </div>
      </div>
      <div style={{ paddingLeft: "10px" }}>
        <button
          onClick={() => {
            setOpenFormUpdate(true);
          }}
        >
          Cập nhật bài viết
        </button>{" "}
      </div>
      {openFormUpdate && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ padding: "10px" }}>
              <br />
              <span>Slug:</span>
              <br />
              <input disabled value={slug} type="text" {...register("slug")} />

              <br />
              <span>Title:</span>
              <br />
              <input type="text" {...register("title", { required: true })} />
              {errors.title && (
                <div style={{ color: "red" }}>title is required</div>
              )}

              <br />
              <span>Description:</span>
              <br />
              <input
                type="text"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <div style={{ color: "red" }}>description is required</div>
              )}
            </div>

            <div style={{ padding: "10px" }}>
              <button> Nhấn để cập nhật </button>
            </div>
          </form>

          <div style={{ paddingLeft: "10px" }}>
            <button
              onClick={() => {
                setOpenFormUpdate(false);
              }}
            >
              Nhấn để đóng form cập nhật
            </button>{" "}
          </div>
        </>
      )}

      <div style={{ padding: "10px" }}>
        <button onClick={handleDeletePost} style={{ color: "red" }}>
          {" "}
          Xóa bài viết{" "}
        </button>
      </div>
    </>
  );
}
