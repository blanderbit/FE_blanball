export const UsersEnpointsEnum = {
  GetMyProfile: '/authentication/client/me',
  DeleteMyProfile: '/authentication/client/me',
  SendApproveCode: '/authentication/client/check/code',
  ChangePassword: '/authentication/client/request-change/password',
  UpdateProfileData: '/authentication/client/me/update',
  GetAllUsers: '/authentication/client/users/list',
  GetRelevantUsers: '/authentication/client/users/relevant/list',
  ChangeUserEmail: '/authentication/client/request-change/email',
  UserPublicProfile: (userId) => `/authentication/client/profile/${userId}`,
};
