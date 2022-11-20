import pkg from '../../../package';

const VersionEmmitter = {
  set: (version) => localStorage.setItem('version', version),
  get: () => localStorage.getItem('version')
};

const fakeCallBack = () => {};

export const VersionDetectorWorker = (handleDifferentVersion) => {
  handleDifferentVersion = typeof handleDifferentVersion === 'function' ? handleDifferentVersion : fakeCallBack;

  const browserVersion = VersionEmmitter.get();
  const packageVersion = pkg.version;

  if(!browserVersion && packageVersion) {
    VersionEmmitter.set(packageVersion);
    return;
  }

  if (browserVersion !== packageVersion) {
    handleDifferentVersion();
    VersionEmmitter.set(packageVersion);
  }
};