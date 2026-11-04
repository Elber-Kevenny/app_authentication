const URLBASE = "http://localhost:3000";
type User = {
  username: string;
  password: string;
  confirmPassword?: string;
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

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }
  return response.json();
};

export const fetchPost = async (url: string, user: User) => {
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
    throw new Error(responseData.message || "Unknown error");
  }
  return responseData;
};

export const getUser = async (url: string) => {
  const response = await fetch(`${URLBASE}${url}`, {
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
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return true;
};
