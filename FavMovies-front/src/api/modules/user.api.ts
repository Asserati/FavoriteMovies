import {
  InfoApiResponse,
  ResponseError,
  SignApiResponse,
} from "../../../../lib/types";
import privateFetch from "../client/private.client";
import publicFetch from "../client/public.client";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
};

const userApi = {
  signin: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await publicFetch<SignApiResponse>(userEndpoints.signin, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if ("data" in response) {
      return { response: response.data as SignApiResponse };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },
  signup: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await publicFetch<SignApiResponse>(userEndpoints.signup, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if ("data" in response) {
      return { response: response.data as SignApiResponse };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },
  getInfo: async () => {
    const response = await privateFetch<InfoApiResponse>(
      userEndpoints.getInfo,
      {
        method: "GET",
      }
    );
    if ("data" in response) {
      return { response: response.data as InfoApiResponse };
    } else {
      throw { error: { message: "Unknown error" } };
    }
  },
};

export default userApi;
