import { jwtDecode } from "jwt-decode";

export const hashExpiredToken = (token) => {
  const { exp } = jwtDecode(token);
  const currentDate = new Date().getTime();

  if (exp <= currentDate) {
    return true;
  }

  return false;
};
