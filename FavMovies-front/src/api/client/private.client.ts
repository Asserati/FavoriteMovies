import { MakeRequestResponse, ResponseError } from "../../../../lib/types";

const baseURL = "http://localhost:9001";

const privateFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<MakeRequestResponse<T>> => {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  const accessToken = localStorage.getItem("actkn");
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  options.headers = Object.fromEntries(headers.entries());
  const response = await fetch(`${baseURL}/${endpoint}`, options);

  if (!response.ok) {
    const info = await response.json();
    const error: ResponseError = {
      message: "An error occurred while fetching the data",
      code: response.status,
      info: info,
    };
    throw error;
  }

  const responseJSON = await response.json();
  return {
    data: responseJSON,
  };
};

export default privateFetch;
