const userAgent = window.navigator.userAgent.toLowerCase();
const vendor = String(window.navigator.vendor).toLowerCase();
const appVersion = String(window.navigator.appVersion).toLowerCase();

const is = {
  windows() {
    return /win/i.test(appVersion);
  },

  mac() {
    return /mac/i.test(appVersion);
  },

  linux() {
    return /linux/i.test(appVersion);
  },

  androidPhone() {
    return /android/i.test(userAgent) && /mobile/i.test(userAgent);
  },

  androidTablet() {
    return /android/i.test(userAgent) && !/mobile/i.test(userAgent);
  },

  iphone() {
    return /iphone/i.test(userAgent);
  },

  ipad() {
    return /ipad/i.test(userAgent);
  },

  ipod() {
    return /ipod/i.test(userAgent);
  },

  blackberry() {
    return /blackberry/i.test(userAgent) || /BB10/i.test(userAgent);
  },

  windowsPhone() {
    return is.windows() && /phone/i.test(userAgent);
  },

  windowsTablet() {
    return is.windows() && !is.windowsPhone() && /touch/i.test(userAgent);
  },

  ie() {
    return /msie/i.test(userAgent) || "ActiveXObject" in window;
  },

  edge() {
    return /edge/i.test(userAgent);
  },

  chrome() {
    return /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor);
  },

  safari() {
    return /safari/i.test(userAgent) && /apple computer/i.test(vendor);
  },

  firefox() {
    return /firefox/i.test(userAgent);
  },

  opera() {
    return /^opera\//.test(userAgent) || /\x20opr\//.test(userAgent);
  },

  touchDevice() {
    return 'ontouchstart' in window ||'DocumentTouch' in window;
  };
};

export default is;
