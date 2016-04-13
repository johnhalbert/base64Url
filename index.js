// Encode/Decode functionality
var base64UrlEncode = require('./base64UrlEncode'),
    base64UrlDecode = require('./base64UrlDecode'),
    base64UrlVerify = require('./base64UrlVerify');

/**
 * @module base64url-util
 * @description - Base64URL Encoder and Decoder for NodeJS
 * @example:
 * `var base64Url = require('base64Url');
 *  var encoded = base64Url.encode('Some text'); // 'U29tZSB0ZXh0'
 *  var decoded = base64Url.decode(encoded);  // 'Some text'`
 */
exports.encode = base64UrlEncode;
exports.decode = base64UrlDecode;
exports.verify = base64UrlVerify;