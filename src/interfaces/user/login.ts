export interface IUpdatePasswordRequest {
  new_password: string;
  confirm_new_password: string;
  verification_token: string;
}

export type IUpdatePasswordResponse = {
  token: ITokenResponse | null;
};

export interface ILoginUserRequest {
  username: string;
  password: string;
}

export type ILoginUserResponse = {
  access_token: string;
  refresh_token: string;
};

export type ITokenResponse = {
  accessToken: string;
  refreshToken: string;
};