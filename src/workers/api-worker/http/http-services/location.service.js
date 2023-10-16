import { AxiosInstance } from '@plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';

export class LocationService {
  static getPlaceByCoords(data) {
    return AxiosInstance.post(
      EndpointsEnum.Location.GetPlaceNameByCoordinates,
      {
        lat: data.lat,
        lon: data.lng,
      }
    );
  }

  static getUkraineCitesList() {
    return AxiosInstance.get(EndpointsEnum.Location.GetUkraineCitiesList);
  }

  static getPlaceByAddress(place_name) {
    return AxiosInstance.post(
      EndpointsEnum.Location.GetCoordinatesByPlaceName,
      {
        place_name,
      }
    );
  }
}
