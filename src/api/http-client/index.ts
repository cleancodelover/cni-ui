import { authPaths } from "@/utils/constants";
import { secureKeys } from "@/utils/secure-store";
import axios from "axios";
import {getCookie} from "cookies-next";

const baseUrl = process.env.NEXT_PUBLIC_APP_API_ENDPOINT;


export const apiHttpClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
});

apiHttpClient.interceptors.request.use(
  async (config) => {
    const currentPath = window.location.pathname;

    if (authPaths.includes(currentPath)) {
      return config;
    }
    const token = getCookie(secureKeys.tokenKey);
    console.log("token :>>>>>>>>>>>>>>", token);
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const tempHttpClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
});

tempHttpClient.interceptors.request.use(async config => {
  const token = getCookie(secureKeys.tokenKey);
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});