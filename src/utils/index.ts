import { jwtDecode } from "jwt-decode";
export const getDecodedToken = () => {
  try {
    const token = getToken();
    return jwtDecode(token) as { username: string; userId: string };
  } catch (error) {
    console.log(error);
    return { username: "", userId: "" };
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token") || "";
  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
