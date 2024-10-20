import { ENV } from "../utils";

export class User {
  baseApi = ENV.BASE_API;

  async getMe(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);

      // Validar si la respuesta es un JSON
      const result = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? await response.json()
        : null;

      if (response.status !== 200)
        throw result || { message: "Error desconocido" };

      return result;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      throw error;
    }
  }
}
