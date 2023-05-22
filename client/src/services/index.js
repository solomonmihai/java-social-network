import api from "./api";

export async function register(data) {
  return api.post("/api/auth/register", data);
}

export async function login(data) {
  try {
    const res = await api.post("/api/auth/login", data);

    if (res.status != 200) {
      return false;
    }

    return res.data;
  } catch (err) {
    console.log("error registering user", err);
    return false;
  }
}
