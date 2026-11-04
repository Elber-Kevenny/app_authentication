import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../types/props.js";
import { login } from "../fetch/api.js";
import { FormCp } from "./form.js";

export const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const title = "Login";
  const switchMessage = "Don't have an account?";
  const switchLinkText = "Sign up";

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await login("/auth", { username, password });
      navigate("/dashboard");
    } catch (err: any) {
      setMessage(err.message || "Invalid username or password");
    }
  };

  const handleSwitchPage = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/register");
    setMessage("");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh", padding: "50px" }}
    >
      <FormCp
        title={title}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        message={message}
        switchMessage={switchMessage}
        switchLinkText={switchLinkText}
        handleSubmit={handleSubmit}
        handleSwitchPage={handleSwitchPage}
      />
    </div>
  );
};
