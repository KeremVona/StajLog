export interface RegisterRequestBody {
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface GetIdRequestBody {
  id: number;
}

export interface UserIdParams {
  userId: number;
}
