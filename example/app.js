var noah = require('../dist/index.js');

console.log(noah);

noah.attach({
  url: 'http://axross.me/',
  factors: ['userAgent', 'language', 'online', 'screenDirection'],
});

throw new Error();
