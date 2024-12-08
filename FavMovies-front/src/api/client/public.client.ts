import { MakeRequestResponse, ResponseError } from "../../../../lib/types";

const baseURL = "http://localhost:9001";

const publicFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<MakeRequestResponse<T>> => {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  options.headers = headers;

  const response = await fetch(`${baseURL}/${endpoint}`, options);

  if (!response.ok) {
    const info = await response.json();

    const error: ResponseError = {
      message: info.error || "An error occurred while fetching the data",
      code: info.statusCode || response.status,
      info: info.message || "Bad luck :/",
    };
    throw error;
  }

  const responseJSON = await response.json();
  return {
    data: responseJSON,
  };
};

export default publicFetch;
