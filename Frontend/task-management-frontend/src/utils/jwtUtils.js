import { TOKEN_KEY, ROLE_KEY, USERNAME_KEY } from "./constants";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthData = ({ token, role, username }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(USERNAME_KEY, username);
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USERNAME_KEY);
};

export const getRole = () => {
  return localStorage.getItem(ROLE_KEY);
};

export const getUsername = () => {
  return localStorage.getItem(USERNAME_KEY);
};

export const isAdmin = () => {
  return getRole() === "ADMIN";
};


export const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  return decoded.exp * 1000 < Date.now();
};