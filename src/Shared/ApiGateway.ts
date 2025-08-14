import { API_BASE } from "./config";

export default class ApiGateway {
  get = async <T>(path: string): Promise<T> => {
    const response = await fetch(`${API_BASE}${path}`);
    const dto: T = await response.json();
    return dto;
  };

  post = async <T>(path: string, payload: any): Promise<T> => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(payload),
    });
    const dto: T = await response.json();
    return dto;
  };
}
