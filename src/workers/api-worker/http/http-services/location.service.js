import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';

export class LocationService {
  static GetPlaceByCoords(data) {
    return AxiosInstance.post('/cities/client/get/place/name/by/coordinates', {
      lat: data.lat,
      lon: data.lng,
    });
  }

  static GetPlaceByAddress(place_name) {
    return AxiosInstance.post('/cities/client/get/coordinates/by/place/name', {
      place_name,
    });
  }

  static ResetPasswordRequest(data) {
    return AxiosInstance.post(
      EndpointsEnum.Authorization.ResetPasswordRequest,
      data
    );
  }

  static VerifyCode(data) {
    return AxiosInstance.post(EndpointsEnum.Authorization.VerifyCode, data);
  }

  static ResetComplete(data) {
    return AxiosInstance.post(EndpointsEnum.Authorization.ResetComplete, data);
  }

  static Register(data) {
    return AxiosInstance.post(EndpointsEnum.Authorization.Register, data);
  }
}
