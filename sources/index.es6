import ErrorStackParser from 'error-stack-parser';

import distinguisher from './distinguisher';

const __notifier = () => {};
const __environment = {};

const parseError = err => {
  if (!(err instanceof Error)) {
    err = new TypeError('noah is not given an instance of Error');
  }

  const stackTrace = ErrorStackParser.parse(err);
  const errorType = (err.name && err.name !== '') ? err.name : 'Error';
  let message = 'Unknown error occurred';
  let functionName = '(unknown function)';
  let fileName = '(unknown source)';
  let lineNumber = 0;
  let columnNumber = 0;

  if (err.message && err.message !== '') {
    message = err.message;
  }

  if (stackTrace.length >= 1 && stackTrace[0].functionName) {
    functionName = stackTrace[0].functionName;
  }

  if (err.fileName) {
    fileName = err.fileName;
  } else if (stackTrace.length >= 1 && stackTrace[0].fileName) {
    fileName = stackTrace[0].fileName;
  }

  if (typeof err.lineNumber === 'number') {
    lineNumber = err.lineNumber;
  } else if (stackTrace.length >= 1 && stackTrace[0].lineNumber) {
    lineNumber = stackTrace[0].lineNumber
  }

  if (typeof err.columnNumber === 'number') {
    columnNumber = err.columnNumber;
  } else if (stackTrace.length >= 1 && stackTrace[0].columnNumber) {
    columnNumber = stackTrace[0].columnNumber
  }

  return { message, functionName, fileName, lineNumber, columnNumber };
};

const getEnvironmentData = () => {
  const screenWidth = window.screen.width || 0;
  const screenHeight = window.screen.height || 0;
  const screenAvailableWidth = window.screen.availWidth || 0;
  const screenAvailableHeight = window.screen.availHeight || 0;
  const screenOrientation = ['portrait', 'landscape'][(screenWidth >= screenHeight) - 0];

  const userAgent = window.navigator.userAgent;
  const browserType = distinguisher.whichBrowserType();
  const browserVersion = distinguisher.whichBrowserVersion();
  const deviceType = distinguisher.whichDeviceType();
  const osType = distinguisher.whichOsType();
  const osVersion = distinguisher.whichOsType();
  const isTouchDevice = distinguisher.isTouchDevice();
};

const errorHandler = (message, fileName, lineNumber, columnNumber, err) => {
  err.message = message;
  err.fileName = fileName;
  err.lineNumber = lineNumber;
  err.columnNumber = columnNumber;

  const parsed = parseError(err);

  __notifier({
    error: parsed,
    environment: __environment,
  });
};

const install = ({ notifier }) => {
  if (typeof notifier !== 'function') {
    throw new ReferenceError('notifier is required');
  }

  __notifier = notifier;
  __environment = getEnvironmentData();

  window.onerror = errorHandler;
};

export default {
  install,
};
