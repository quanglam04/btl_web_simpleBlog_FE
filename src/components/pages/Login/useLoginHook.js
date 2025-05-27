import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLoginHook = () => {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (setUser) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      if (response.ok) {
        alert("Login successful!");
        const result = await response.json();
        setUser(result);
        navigate("/stats");
      } else {
        setError("Invalid username or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed!");
    }
  };

  return {
    creds,
    setCreds,
    error,
    handleLogin,
  };
};

export default useLoginHook;
