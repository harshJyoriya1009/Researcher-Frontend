import { apiClient, clearStoredTokens, getStoredToken, setStoredTokens } from "./apiClient";
import { mapUser, type ApiUser } from "@/lib/apiMappers";
import type { User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface ApiAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: ApiUser;
}

interface ApiLinkedAccount {
  provider: string;
  email: string;
  linked_at: string;
}

interface ApiLinkedAccountsResponse {
  has_password: boolean;
  linked_accounts: ApiLinkedAccount[];
}

export interface AuthResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LinkedAccount {
  provider: string;
  email: string;
  linkedAt: string;
}

export interface LinkedAccountsResult {
  hasPassword: boolean;
  linkedAccounts: LinkedAccount[];
}

function mapAuthResponse(data: ApiAuthResponse): AuthResult {
  return {
    user: mapUser(data.user),
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}

function mapLinkedAccountsResponse(data: ApiLinkedAccountsResponse): LinkedAccountsResult {
  return {
    hasPassword: data.has_password,
    linkedAccounts: data.linked_accounts.map((account) => ({
      provider: account.provider,
      email: account.email,
      linkedAt: account.linked_at,
    })),
  };
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResult> {
    const { data } = await apiClient.post<ApiAuthResponse>("/auth/login", payload);
    const result = mapAuthResponse(data);
    setStoredTokens(result.accessToken, result.refreshToken);
    return result;
  },

  async loginWithGoogle(credential: string): Promise<AuthResult> {
    const { data } = await apiClient.post<ApiAuthResponse>("/auth/google", { credential });
    const result = mapAuthResponse(data);
    setStoredTokens(result.accessToken, result.refreshToken);
    return result;
  },

  async register(payload: RegisterPayload): Promise<AuthResult> {
    const { data } = await apiClient.post<ApiAuthResponse>("/auth/register", payload);
    const result = mapAuthResponse(data);
    setStoredTokens(result.accessToken, result.refreshToken);
    return result;
  },

  async linkGoogle(credential: string): Promise<void> {
    await apiClient.post("/auth/link/google", { credential });
  },

  async unlinkGoogle(): Promise<void> {
    await apiClient.delete("/auth/link/google");
  },

  async getLinkedAccounts(): Promise<LinkedAccountsResult> {
    const { data } = await apiClient.get<ApiLinkedAccountsResponse>("/auth/linked-accounts");
    return mapLinkedAccountsResponse(data);
  },

  async setInitialPassword(newPassword: string): Promise<void> {
    await apiClient.post("/auth/set-password", { new_password: newPassword });
  },

  async me(): Promise<User> {
    const { data } = await apiClient.get<ApiUser>("/auth/me");
    return mapUser(data);
  },

  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post("/auth/forgot-password", { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post("/auth/reset-password", { token, new_password: newPassword });
  },

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post("/auth/verify-email", { token });
  },

  async resendVerification(): Promise<void> {
    await apiClient.post("/auth/resend-verification");
  },

  async logout() {
    const refreshToken = getStoredToken("ara-refresh-token");
    try {
      await apiClient.post(
        "/auth/logout",
        refreshToken ? { refresh_token: refreshToken } : undefined
      );
    } catch {
      // Best-effort — still clear local session below even if the request fails.
    }
    clearStoredTokens();
  },
};
