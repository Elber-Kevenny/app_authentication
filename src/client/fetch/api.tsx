
const URLBASE = "http://localhost:3000";
type User = {
  username: string,
  password: string
}

export const register = async (url: string, user: User) => {
  const response = await fetch(`${URLBASE}${url}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error("Erro ao se registrar");
  } return response.json()
};
