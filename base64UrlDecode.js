/**
 * @name base64UrlDecode
 * @description - Decodes base 64 url safe strings to their original unicode
 *                representations
 * @param {string} base64UrlString - The base 64 url encoded string
 * @returns {string} - The unicode decoded string
 */
function base64UrlDecode(base64UrlString)
{
  // Base64Url lookup table
  var base64URL =
      {'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,'K':10,
       'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,'U':20,
       'V':21,'W':22,'X':23,'Y':24,'Z':25,'a':26,'b':27,'c':28,'d':29,'e':30,
       'f':31,'g':32,'h':33,'i':34,'j':35,'k':36,'l':37,'m':38,'n':39,'o':40,
       'p':41,'q':42,'r':43,'s':44,'t':45,'u':46,'v':47,'w':48,'x':49,'y':50,
       'z':51,'0':52,'1':53,'2':54,'3':55,'4':56,'5':57,'6':58,'7':59,'8':60,
       '9':61,'-':62,'_':63};

  var base64UrlBits = base64UrlToBits(base64UrlString),
      unicodeString = base64BitsToUnicode(base64UrlBits);

  // Return the formatted string
  return unicodeString;

  /**
   * @name base64UrlToBits
   * @description - Splits a base64 url encoded string into its binary 
   *                representation
   * @param {string} string - The string to split
   * @returns {string} - The binary representation of the original base64 
   *                     encoded string
   */
  function base64UrlToBits(string)
  {
    var base64UrlBits = '';
    string = string.split('');

    // Loop through the array and create a 6-bit binary string from each of the
    // characters contained in the array
    for (var i = 0; i < string.length; i++) {
      var base64CharBits = base64URL[string[i]].toString(2);
      base64UrlBits += padLeft(base64CharBits.length) + base64CharBits;
    }

    // Return the bits
    return base64UrlBits;

    /**
     * @name padLeft
     * @description - Pads a 6-bit base64 binary string with leading zeros
     * @param {number} numBits - The number of bits current in the string
     * @returns {string} - The padding
     */
    function padLeft(numBits)
    {
      // Determine the number of bits to pad
      var toPad   = 6 - numBits,
          padding = '';

      // Add leading zeros to the padding value based on the number of toPad
      for (var i = 0; i < toPad; i++) {
        padding += '0';
      }

      // Return the padding
      return padding;
    }

  }

  /**
   * @name base64BitsToUnicode
   * @description - Converts string of base64 bits to corresponding unicode
   *                characters
   * @param {string} base64UrlBits - The bits to be converted
   * @returns {string} - The converted unicode characters
   */
  function base64BitsToUnicode(base64UrlBits)
  {
    var unicodeString = '';

    // Split the string into an array for easier processing
    base64UrlBits = base64UrlBits.split('');

    // Loop through the array, taking 8 bit chunks from the string passed into
    // the function.  Convert the bits into an integer and then get the 
    // corresponding character from the number that was derived from those bits
    // Once the character has been found, append it to the unicode string to be
    // returned
    while (base64UrlBits.length > 0)
    {
      var bitsToConvert = base64UrlBits.splice(0, 8);
      bitsToConvert = bitsToConvert.join('');
      bitsToConvert = parseInt(bitsToConvert, 2);
      bitsToConvert = String.fromCharCode(bitsToConvert);
      unicodeString += bitsToConvert;
    }

    // Return the processed unicode string
    return unicodeString;
  }

}

// For string passed in through the command line with nodejs
if (process.argv[2])
  console.log(base64UrlDecode(process.argv.slice(2, process.argv.length).join(' ')));

// NodeJS support
module.exports = base64UrlDecode;