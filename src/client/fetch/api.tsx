// @ts-ignore
const URLBASE = import.meta.env.PROD ? "" : "http://localhost:3000";

type User = {
  username: string;
  password: string;
  confirmPassword?: string;
};

const getHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
};

export const login = async (url: string, user: User) => {
  const response = await fetch(`${URLBASE}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Invalid username or password");
  }

  if (responseData.token) {
    localStorage.setItem("token", responseData.token);
  }

  return responseData;
};

export const fetchPost = async (url: string, user: User) => {
  const response = await fetch(`${URLBASE}${url}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
    credentials: "include",
  });
  
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Unknown error");
  }

  if (responseData.token) {
    localStorage.setItem("token", responseData.token);
  }
  
  return responseData;
};

export const getUser = async (url: string) => {
  const response = await fetch(`${URLBASE}${url}`, {
    method: "GET",
    headers: getHeaders(),
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Unauthorized");
  }

  return responseData;
};

export const logoutUser = async (url: string) => {
  const response = await fetch(`${URLBASE}${url}`, {
    method: "GET",
    headers: getHeaders(),
    credentials: "include",
  });

  localStorage.removeItem("token");

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return true;
};
