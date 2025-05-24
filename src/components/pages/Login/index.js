import React from "react";
import useLoginHook from "./useLoginHook";

function Login(props) {
  const { setUser } = props;

  const { creds, error, handleLogin, setCreds } = useLoginHook();

  return (
    <div
      style={{
        padding: 10,
        fontSize: 20,
        marginLeft: "41%",
      }}
    >
      <br />
      <span>Username:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />
      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <br />
      <button
        onClick={() => {
          handleLogin(setUser);
        }}
      >
        Login
      </button>
      <p>{error}</p>
    </div>
  );
}

export default Login;
