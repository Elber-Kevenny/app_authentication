import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../types/props.js";
import { register } from "../fetch/api.js";
import { FormCp } from "./form.js";

export const Login: React.FC<LoginProps> = ({ initialIsRegister = false }) => {
  const [isRegister, setIsRegister] = useState(initialIsRegister);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const title = isRegister ? "Register" : "Login";
  const switchMessage = isRegister
    ? "Already have an account?"
    : "Don't have an account?";
  const switchLinkText = isRegister ? "Sign in" : "Sign up";

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const data = await register("/account", { username, password });
      if (data) {
        navigate("/login");
      } else {
        setMessage(data.message);
        return;
      }
    } catch (err: any) {
      setMessage(err.message || "Erro ao tentar registrar");
      return;
    }
    navigate("/dashboard");
  };

  const handleSwitchPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRegister(!isRegister);
    setMessage("");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh", padding: "50px" }}
    >
      <FormCp
      isRegister={isRegister}
        title={title}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        message={message}
        switchMessage={switchMessage}
        switchLinkText={switchLinkText}
        handleSubmit={handleSubmit}
        handleSwitchPage={handleSwitchPage}
      />
    </div>
  );
};
