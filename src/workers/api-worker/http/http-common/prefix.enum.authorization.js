export const AuthorizationEnpointsEnum = {
  Register: '/authentication/client/register',
  Login: '/authentication/client/login',
  Logout: '/authentication/client/logout',
  RefreshTokens: '/authentication/client/refresh/tokens',
  ResetPasswordRequest: '/authentication/client/request-reset/password',
  VerifyCode: '/authentication/client/check/code',
  VerifyCodeResetPassword:
    '/authentication/client/validate/reset-password/code',
  ResetComplete: '/authentication/client/password/reset-complete',
  AddAvatar: '/authentication/client/update/my/profile/avatar',
  VerifyEmail: '/authentication/client/request-verify/email',
  ValidateRefreshToken: '/authentication/client/validate/refresh/token',
};
