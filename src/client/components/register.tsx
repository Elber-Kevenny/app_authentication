import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../fetch/api.js";
import { FormCp } from "./form.js";

export const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const title = "Register";
  const switchMessage = "Already have an account?";
  const switchLinkText = "Sign in";

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem!");
      return;
    }
    try {
      const data = await register("/account", { username, password });

      navigate("/login");
    } catch (err: any) {
      setMessage(err.message || "Erro ao tentar registrar");
    }
  };

  const handleSwitchPage = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh", padding: "50px" }}
    >
      <FormCp
        isRegister={true}
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
