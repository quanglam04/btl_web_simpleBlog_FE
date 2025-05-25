import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import usePostHook from "./usePostHook";

export default function Post(props) {
  const { user } = props;
  const { slug } = useParams();
  const [openFormUpdate, setOpenFormUpdate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleDeletePost, fetchData, post } = usePostHook();

  const onSubmit = async (data) => {
    const post = JSON.stringify(data);
    try {
      const response = await fetch(
        "http://localhost:8080/api/post/update/" + slug,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: post,
        }
      );
      if (response.ok) {
        alert(`Cập nhật thành công bài viết với slug: ${slug}`);
      }
    } catch (error) {
      console.error("Cập nhật thất bại:", error);
    }
    fetchData(slug);
  };

  useEffect(() => {
    fetchData(slug);
  }, []);
  const { title, description, author } = post;
  return (
    <>
      <div style={{ fontSize: "20px", padding: "10px" }}>
        <div>
          <span style={{ color: "red" }}> Title: </span>
          {title}
        </div>
        <div>
          <span style={{ color: "red" }}> Description: </span>
          {description}
        </div>
        <div>
          <span style={{ color: "red" }}> Author: </span>
          {author}
        </div>
      </div>
      <div style={{ paddingLeft: "10px" }}>
        <button
          style={{ fontSize: "20px" }}
          onClick={() => {
            setOpenFormUpdate(true);
          }}
        >
          Cập nhật bài viết
        </button>
      </div>
      {openFormUpdate && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ padding: "10px", fontSize: "20px" }}>
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

              <br />
              <span>Author:</span>
              <br />
              <input
                disabled
                type="text"
                value={author}
                {...register("author", { required: true })}
              />
              {errors.author && (
                <div style={{ color: "red" }}>Author is required</div>
              )}
            </div>

            <div style={{ padding: "10px" }}>
              <button style={{ fontSize: "20px" }}> Nhấn để cập nhật </button>
            </div>
          </form>

          <div style={{ paddingLeft: "10px" }}>
            <button
              style={{ fontSize: "20px" }}
              onClick={() => {
                setOpenFormUpdate(false);
              }}
            >
              Nhấn để đóng form cập nhật
            </button>
          </div>
        </>
      )}

      <div style={{ padding: "10px" }}>
        <button
          onClick={() => {
            handleDeletePost(slug);
          }}
          style={{ color: "red", fontSize: "20px" }}
        >
          Xóa bài viết
        </button>
      </div>
    </>
  );
}
