import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';
import {
  AxiosParams,
  AxiosQuery,
  AxiosSkipErrorMessageType,
} from '../../../utils-worker';
import { FilterParamsDecorator } from '../filter/filter.utils';
import {
  filterConfigForUsers,
  filterConfigForRelevantUsers,
} from '../filter/filter.config';
import { DETAILS_TYPE_ENUM } from '../../../type-request-message-worker';

export class UserService {
  getMyProfile() {
    return AxiosInstance.get(EndpointsEnum.Users.GetMyProfile);
  }

  deleteMyProfile() {
    return AxiosInstance.delete(EndpointsEnum.Users.DeleteMyProfile);
  }

  sendApproveCode(verificationCode) {
    return AxiosInstance.post(
      EndpointsEnum.Users.SendApproveCode,
      verificationCode
    );
  }

  changePassword(passwordsData) {
    return AxiosInstance.post(
      EndpointsEnum.Users.ChangePassword,
      passwordsData
    );
  }

  updateProfileData(payload) {
    return AxiosInstance.put(EndpointsEnum.Users.UpdateProfileData, payload);
  }

  @FilterParamsDecorator(filterConfigForRelevantUsers)
  getRelevantUsers({ search, skipids }) {
    return AxiosInstance.get(
      EndpointsEnum.Users.GetRelevantUsers,
      AxiosParams(
        AxiosQuery({
          search: search,
          skipids: skipids?.join(','),
        })
      ),
      AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
    );
  }

  @FilterParamsDecorator(filterConfigForUsers)
  getAllUsers(options) {
    return AxiosInstance.get(
      EndpointsEnum.Users.GetAllUsers,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  changeUserEmail(payload) {
    return AxiosInstance.post(EndpointsEnum.Users.ChangeUserEmail, payload);
  }

  getUserPublicProfile(userId) {
    return AxiosInstance.get(EndpointsEnum.Users.UserPublicProfile(userId));
  }
}
