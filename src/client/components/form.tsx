import React from "react";
import { FormCpProps } from "../types/props.js";

export const FormCp: React.FC<FormCpProps> = ({
  isRegister,
  title,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  message,
  switchMessage,
  switchLinkText,
  handleSubmit,
  handleSwitchPage,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "500px", margin: "0 auto" }}
      className="bg-white p-4 rounded shadow-sm"
    >
      <h2 className="mb-4 text-center fw-bold">{title}</h2>

      {message && (
        <div className="alert alert-danger py-2" role="alert">
          {message}
        </div>
      )}

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="usernameInput">
          Username
        </label>
        <input
          type="text"
          id="usernameInput"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="passwordInput">
          Password
        </label>
        <input
          type="password"
          id="passwordInput"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {isRegister && (
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="confirmPasswordInput">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPasswordInput"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword?.(e.target.value)}
            required
          />
        </div>
      )}

      <div className="row mb-4">
        <div className="col text-muted">
          {switchMessage}{" "}
          <a
            href="#"
            onClick={handleSwitchPage}
            className="text-decoration-none fw-bold"
          >
            {switchLinkText}
          </a>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100 mb-4">
        {title}
      </button>
    </form>
  );
};
