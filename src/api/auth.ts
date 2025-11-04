// import api from "./client";

const DUMMY_USER = {
  id: 1,
  username: "carlos",
  password: "12345",
  token: "dummy-token-12345"
};

export async function login(username: string, password: string) {

  await new Promise((resolve) => setTimeout(resolve, 500)); //Por no mas jaja
  // const { data } = await api.post("/token/", { username, password });

  if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
    localStorage.setItem("token", DUMMY_USER.token);
    localStorage.setItem("user", JSON.stringify({ id: DUMMY_USER.id, name: DUMMY_USER.username }));

    return {
      token: DUMMY_USER.token,
      user: {
        id: DUMMY_USER.id,
        name: DUMMY_USER.username,
      }
    };
  } else {
    throw new Error("Invalid credentials");
  }
}

export async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function getAuthStatus() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return {
    isAuthenticated: !!token,
    user: user ? JSON.parse(user) : null,
  };
}