import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

function getStoredToken(key: "ara-access-token" | "ara-refresh-token"): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

function setStoredTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("ara-access-token", accessToken);
  localStorage.setItem("ara-refresh-token", refreshToken);
}

function clearStoredTokens() {
  localStorage.removeItem("ara-access-token");
  localStorage.removeItem("ara-refresh-token");
}

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken("ara-access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getStoredToken("ara-refresh-token");
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refresh_token: refreshToken,
    });
    setStoredTokens(data.access_token, data.refresh_token);
    return data.access_token as string;
  } catch {
    clearStoredTokens();
    return null;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retried?: boolean }) | undefined;
    const isAuthEndpoint = original?.url?.includes("/auth/login") || original?.url?.includes("/auth/register");

    if (error.response?.status === 401 && original && !original._retried && !isAuthEndpoint) {
      original._retried = true;

      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const newToken = await refreshPromise;

      if (newToken) {
        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      }

      clearStoredTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export { setStoredTokens, clearStoredTokens, getStoredToken };
