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
  async (config:any) => {
    const currentPath = window.location.pathname;

    if (authPaths.includes(currentPath)) {
      return config;
    }
    const token = getCookie(secureKeys.tokenKey);
    console.log("token :>>>>>>>>>>>>>>", token);
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // if (token || unprotectedRoutes.includes(currentRoute)) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // } else {
    //   localStorage.setItem(REVISIT_PATH, currentPath);
    //   deleteCookie(TOKEN_COOKIE);
    //   toast.error("Session expired, please log in");
    //   window.location.href = "/";
    // }

    console.log("config :>>>>>>>>>>>>>>", config)
    return config;
  },
  (error:any) => Promise.reject(error)
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