base64Url
=========
Encodes and Decodes string to and from Base 64 URL safe format.

Example:
========
```javascript
var base64Url = require('base64url-util');

var encoded = base64Url.encode('Some text'); // 'U29tZSB0ZXh0'
if (base64Url.verify(encoded))  // true
  var decoded = base64Url.decode(encoded); // 'Some text'
```