import axios from "axios";
// import { env } from "../../Constant/env";
import { customNotification, ErrorNotification } from "./notifications";

const UNKNOWN_ERROR =
  "Unknown error, please retry or check internet connection.";
// const baseApiUrl = "http://localhost:3000";
const baseApiUrl = "https://nest-rest-api-blush.vercel.app";

const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 0,
});

// ========== REQUEST INTERCEPTOR ==========
service.interceptors.request.use(
  (config) => {
    // Get token from localStorage if not already in headers
    if (!config.headers["Authorization"]) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    // Attach current business ID
    const currentBusinessId = localStorage.getItem("currentBusinessId");
    if (currentBusinessId) {
      config.headers["x-business-id"] = currentBusinessId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ========== RESPONSE INTERCEPTOR ==========
service.interceptors.response.use(
  async (response) => {
    // Handle blob responses (e.g., file download)
    if (response.config.responseType === "blob") {
      const contentType = response.headers["content-type"] || "";
      if (contentType.includes("application/json")) {
        const text = await response.data.text();
        const error = JSON.parse(text);
        ErrorNotification(error.message || UNKNOWN_ERROR);
        return Promise.reject(new Error(error.message || UNKNOWN_ERROR));
      }
      return response;
    }

    const res = response.data;

    // Handle non-200 status codes
    if ((res?.statusCode ?? 200) !== 200) {
      ErrorNotification(res.message || UNKNOWN_ERROR);

      if (
        [11001, 11002].includes(res.statusCode) ||
        [11001, 11002].includes(res.code)
      ) {
        localStorage.clear();
        window.location.reload();
      }

      const error = new Error(res.message || UNKNOWN_ERROR);
      error.code = res.statusCode;
      return Promise.reject(error);
    }

    return res;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error?.response?.status === 401) {
      localStorage.clear();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    const errMsg = error?.response?.data?.message || UNKNOWN_ERROR;
    ErrorNotification(errMsg);
    error.message = errMsg;

    return Promise.reject(error);
  }
);

/**
 * @typedef {Object} RequestOptions
 * @property {string} [successMsg] - Success message to display.
 * @property {string} [errorMsg] - Optional custom error message.
 */

/**
 * Axios request wrapper
 * @param {AxiosRequestConfig} config - Axios config object.
 * @param {RequestOptions} options - Custom options for notification.
 * @returns {Promise<any>} - Axios response.
 */
export const request = async (config, options = {}) => {
  try {
    const { successMsg, errorMsg } = options;

    // Normalize double slashes in URL
    config.url = `${baseApiUrl + config.url}`.replace(/(?<!:)\/{2,}/g, "/");

    const res = await service.request(config);

    if (successMsg) customNotification("", successMsg);
    if (errorMsg) ErrorNotification(errorMsg);

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
