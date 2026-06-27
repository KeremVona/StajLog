export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}

export interface AuthState {
  loading: boolean;
  userInfo: object;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
