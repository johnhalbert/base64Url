/**
 * @name base64UrlEncode
 * @description - Base64Url Encoder for URL safe base64 string generation
 * @param {string} input - The string to encode
 * @returns {string} - The Base64Url encoded string
 */
function base64UrlEncode(input)
{
  // Output and base64Url lookup table
  var base64out = '',
      base64URL =
      ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
       'S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j',
       'k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1',
       '2','3','4','5','6','7','8','9','-','_'];

  // This makes processing the string a bit simpler
  input = input.split('');

  // The majority of the process is extracting blocks of three characters and
  // converting them to their corresponding binary representation to be recoded
  // as base64 characters using the base64Url array which relies on 6-bit
  // representations taken from the 24-bit string we generate from the 3
  // character block
  while (input.length > 0)
  {
    // The bits to be processed from input text will be stored here,
    // represented as decimal numbers until being converted to a string and
    // converted to corresponding base64 characters
    unicodeBits = 0;

    // Generate a block to convert to base64
    var block = createBlock(input);
    
    // Bitwise concatenation into 24-bit string
    for (var i = 0, j = 16; i < block.length; i++, j -= 8) {
      unicodeBits += getCharValue(block[i], j);
    }

    // Generate the 24-bit binary value
    unicodeBits = unicodeBits.toString(2);

    // Pad zeros left, if necessary
    unicodeBits = padLeft(unicodeBits.length) + unicodeBits;
    // Trim bits from right, if necessary (block was less than 3 characters)
    unicodeBits = trimRight(unicodeBits, block.length);

    // Add the processed base64 block to the output
    base64out += generateBaseChars(unicodeBits, block.length);
  }

  // Return the base64 string
  return base64out;

  /**
   * @name createBlock
   * @descriptino - Creates a block of 3 characters to be encoded into base64
   * @param {array} arr - The array from which to create the block
   * @returns {array} - The created block
   */
  function createBlock(arr)
  {
    // Determine how big the splice should be & splice the next set of 
    // characters
    var blockLength = arr.length > 3 ? 3 : arr.length,
        block       = arr.splice(0,blockLength);

    return block;
  }

  /**
   * @name getCharValue
   * @description - Generates a decimal number based on input character,
   *                shifting it the appropriate number of bits left
   * @param {string} char - The character to evaluate
   * @param {number} shift - The number of bits to shift left
   * @returns {number} - The character code after being shifted
   */
  function getCharValue(char, shift)
  {
    return char.charCodeAt() << shift;
  }

  /**
   * @name padLeft
   * @description - Leftmost character base 2 representations do not include
   *                leading zeros, which are necessary to determine the proper
   *                base64 values derived from the 24 bit unicode string
   * @param {number} chars - Total number of characters in the unicdoe string
   * @returns {string} - Zeros to pad the unicode bits with
   */
  function padLeft(chars)
  {
    // Determine the number of zeros to pad, initialize the padding string
    var toPad   = 24 - chars,
        padding = '';

    // Generate the padding string
    for (var i = 0; i < toPad; i++) {
      padding += '0';
    }

    // Return padding zeros
    return padding;
  }

  /**
   * @name trimRight
   * @description - Trims trailing bits generated from left shift where block
   *                is less than three characters
   * @param {string} bits - String of unicode bits
   * @param {number} chars - The number of characters in the block of unicode
   *                         characters
   * @returns {string} - The original string or a substring based on the number
   *                     of characters in the block
   */
  function trimRight(bits, chars)
  {
    // Based on the number of characters in the block, return substring from
    // bits string
    switch (chars)
    {
      case 2:
        return bits.slice(0, 18);
      case 1:
        return bits.slice(0, 12);
      default:
        return bits;
    }
  }

  /**
   * @name generateBaseChars
   * @description - Separates the unicode bits and generates 6-bit base64
   *                characters
   * @param {string} bits - 24-bit unicode bit string
   * @param {number} chars - Number of characters in the block
   * @returns {string} - Base64 encoded string for the given block
   */
  function generateBaseChars(bits, chars)
  {
    // There is always one more base64 character in a given block than unicode
    // characters
    chars += 1;

    // The base64 character string to be created
    var base64Chars = '';

    // Based on the length of the block, 6-bit base64 character codes are
    // removed from the unicode bit string and used to look up their associated
    // base64 characters
    for (var i = 0, j = 0; i < chars; i++, j += 6) {
      base64Chars += base64URL[parseInt(bits.slice(j, j+6), 2)];
    }

    return base64Chars;
  }

}

// Provide commandline output
if (process.argv[2])
  console.log(base64UrlEncode(process.argv.slice(2, process.argv.length).join(' ')));

module.exports = base64UrlEncode;