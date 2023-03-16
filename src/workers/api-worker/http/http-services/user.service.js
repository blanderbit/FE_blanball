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
    return AxiosInstance.get(EndpointsEnum.Users.getMyProfile);
  }

  deleteMyProfile() {
    return AxiosInstance.delete(EndpointsEnum.Users.deleteMyProfile);
  }

  sendApproveCode(verificationCode) {
    return AxiosInstance.post(
      EndpointsEnum.Users.sendApproveCode,
      verificationCode
    );
  }

  changePassword(passwordsData) {
    return AxiosInstance.post(
      EndpointsEnum.Users.changePassword,
      passwordsData
    );
  }

  updateProfileData(payload) {
    return AxiosInstance.put(EndpointsEnum.Users.updateProfileData, payload);
  }

  @FilterParamsDecorator(filterConfigForRelevantUsers)
  getRelevantUsers({ search, skipids }) {
    return AxiosInstance.get(
      EndpointsEnum.Users.getRelevantUsers,
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
      EndpointsEnum.Users.getAllUsers,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  changeUserEmail(payload) {
    return AxiosInstance.post(EndpointsEnum.Users.changeUserEmail, payload);
  }

  getUserPublicProfile(userId) {
    return AxiosInstance.get(EndpointsEnum.Users.userPublicProfile(userId));
  }
}
