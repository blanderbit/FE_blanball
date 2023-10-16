import { AxiosInstance } from '@plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';

export class HintsService {
  static getAllHints() {
    return AxiosInstance.get(EndpointsEnum.Hints.GetAllHints);
  }
}
