import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";

const allVersions = [
  {
    version: '1.0.7',
    date: '10.04.2022'
  },
  {
    version: '1.0.8',
    date: '11.04.2022'
  },
  {
    version: '1.0.9',
    date: '12.04.2022'
  },
  {
    version: '1.0.11',
    date: '13.04.2022'
  }
]

const currentVersion = {
  "version_number": "1.0.1",
  "version_type": "Minor",
  "images": [
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
  ],
  "what_new": [
    "afadsf asdf asdf",
    "afadsf asdf asdf",
    "afadsf asdf asdf",
  ],
  "bug_fixes": [
    "afadsf asdf asdf",
    "afadsf asdf asdf",
    "afadsf asdf asdf",
  ],
  "features": [
    "afadsf asdf asdf",
    "afadsf asdf asdf",
    "afadsf asdf asdf",
  ],
  "improvements": [
    "afadsf asdf asdf",
    "afadsf asdf asdf",
    "afadsf asdf asdf",
  ],
}

export class VersionsService {
  static getAllVersions() {
    // return AxiosInstance.get(
    //   EndpointsEnum.Users.getMyProfile
    // )
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(allVersions);
      }, 2000)
    });
  }

  static getCurrentVersion() {
    // return AxiosInstance.get(
    //   EndpointsEnum.Users.getMyProfile
    // )
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(currentVersion);
      }, 2000)
    });
  }
}