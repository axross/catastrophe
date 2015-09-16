import is from './is';

const userAgent = window.navigator.userAgent.toLowerCase();

const whichBrowserType = () => {
  if (is.opera()) return 'opera';
  if (is.ie()) return 'ie';
  if (is.chrome()) return 'chrome';
  if (is.safari()) return 'safari';
  if (is.firefox()) return 'firefox';

  return '(unknown)';
};

const whichBrowserVersion = () => {
  let version = '';

  if (is.opera()) {
    version = userAgent.substring(userAgent.indexOf('opera') + 6);
  } else if (is.ie()) {
    version = userAgent.substring(userAgent.indexOf('msie') + 5);
  } else if (is.edge()) {
    version = userAgent.substring(userAgent.indexOf('edge') + 5);
  } else if (is.chrome()) {
    version = userAgent.substring(userAgent.indexOf('chrome') + 7);
  } else if (is.safari()) {
    if (userAgent.indexOf('version')) {
      version = userAgent.substring(userAgent.indexOf('version') + 8);
    } else {
      version = userAgent.substring(userAgent.indexOf('safari') + 7);
    }
  } else if (is.firefox()) {
    version = userAgent.substring(userAgent.indexOf('firefox') + 8);
  } else {
    version = '(unknown)';
  }

  return '' + parseFloat(version.split(';')[0].split(' ')[0], 10);
};

const whichDeviceType = () => {
  if (is.androidPhone()) return 'androidPhone';
  if (is.androidTablet()) return 'androidTablet';
  if (is.iphone()) return 'iphone';
  if (is.ipad()) return 'ipad';
  if (is.ipod()) return 'ipod';
  if (is.blackberry()) return 'blackberry';
  if (is.windowsPhone()) return 'windowsPhone';
  if (is.windowsTablet()) return 'windowsTablet';

  return 'desktop';
};

const whichOsType = () => {
  if (is.androidPhone() || is.androidTablet()) return 'android';
  if (is.iphone() || is.ipad() || is.ipod()) return 'ios';
  if (is.mac()) return 'mac';
  if (is.windows()) return 'windows';
  if (is.linux()) return 'linux';

  return '(unknown)';
};

const whichOsVersion = () => {
  if (is.androidPhone() || is.androidTablet()) {
    const executed = /android ([0-9]\.[0-9](\.[0-9]))/i.exec(userAgent);

    if (!executed || !executed[1]) return '(unknown)';

    return executed[1];
  }
  if (is.iphone() || is.ipad() || is.ipod()) {
    const executed = /os ([0-9]_[0-9](_[0-9]*))/i.exec(userAgent);

    if (!executed || !executed[1]) return '(unknown)';

    return executed[1].replace('_', '.');
  }
  if (is.windows()) {
    const executed = /windows nt ([0-9][0-9]?\.[0-9])/i.exec(userAgent);

    if (!executed || !executed[1]) return '(unknown)';

    if (executed[1] === '5.1') return 'XP 32bit';
    if (executed[1] === '5.2') return 'XP 64bit';
    if (executed[1] === '6.0') return 'Vista';
    if (executed[1] === '6.1') return '7';
    if (executed[1] === '6.2') return '8';
    if (executed[1] === '6.3') return '8.1';
    if (executed[1] === '10.0') return '10';
  }

  return '(unknown)';
};

const isTouchDevice = is.touchDevice;

export default {
  whichBrowserType,
  whichBrowserVersion,
  whichDeviceType,
  whichOsType,
  whichOsVersion,
  isTouchDevice,
};
