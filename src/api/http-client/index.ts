import { authPaths } from "@/utils/constants";
import { REVISIT_PATH, TEMP_TOKEN_COOKIE, TOKEN_COOKIE } from "@/utils/constants/cookies";
import { validateToken } from "@/utils/validate-token";
import axios from "axios";
import {getCookie, deleteCookie} from "cookies-next";
import {toast} from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_APP_API_ENDPOINT;

export const apiHttpClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
});

apiHttpClient.interceptors.request.use(
  (config:any) => {
    const currentPath = window.location.pathname;

    if (authPaths.includes(currentPath)) {
      return config;
    }
    const token = getCookie(TOKEN_COOKIE);

    if (token && validateToken(token as string)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      localStorage.setItem(REVISIT_PATH, currentPath);
      deleteCookie(TOKEN_COOKIE);
      toast.error("Session expired, please log in");
      window.location.href = "/login";
    }

    return config;
  },
  (error:any) => Promise.reject(error)
);

export const tempHttpClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
});

tempHttpClient.interceptors.request.use(async config => {
  const token = getCookie(TEMP_TOKEN_COOKIE);

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});