import { ENV } from "../utils";

export class Auth {
  constructor() {
    this.baseApi = ENV.BASE_API;
  }

  async register(data) {
    const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    };

    try {
      const response = await fetch(url, params);

      // Validar si la respuesta es un JSON
      const result = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? await response.json()
        : null;

      if (response.status !== 201) {
        throw result || { message: "Error desconocido" }; // Manejar errores si no hay un mensaje claro
      }

      return result;
    } catch (error) {
      console.error("Error en la solicitud", error);
      throw error;
    }
  }

  async login(data) {
    const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, params);

      // Validar si la respuesta es un JSON
      const result = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? await response.json()
        : null;

      if (response.status !== 200) {
        throw result || { message: "Error desconocido" }; // Manejar errores si no hay un mensaje claro
      }

      return result;
    } catch (error) {
      console.error("Error en la solicitud", error);
      throw error;
    }
  }

  setAccessToken(token) {
    localStorage.setItem(ENV.JWT.ACCESS, token);
  }

  getAccessToken() {
    return localStorage.getItem(ENV.JWT.ACCESS);
  }

  setRefreshToken(token) {
    localStorage.setItem(ENV.JWT.REFRESH, token);
  }

  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }

  removeTokens() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }
}
