import { Outlet } from "react-router-dom";

export default function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Blog</h1>
      <Outlet />
    </div>
  );
}
