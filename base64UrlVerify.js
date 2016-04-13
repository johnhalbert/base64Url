/**
 * @module base64url-util
 * @name base64UrlVerify
 * @description - Verifies the validity of a base64url encoded string
 * @param {string} base64UrlString
 * @returns {boolean} - True = valid, false = invalid
 */
function base64UrlVerify(base64UrlString)
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
  
  // If they did not provide a string, it cannot be a valid base64url string
  if (typeof base64UrlString !== 'string')
    return false;

  // Create array and loop through each of the items in the array, checking
  // that it's defined in the base64url lookup table. Return false if it is
  // not.
  base64UrlString = base64UrlString.split('');
  for (var i = 0; i < base64UrlString.length; i++)
  {
    if (base64URL[base64UrlString[i]] === undefined)
      return false;
  };

  // Return true if all of the characters were in the lookup table
  return true;
}

// For command line use
if (process.argv[2])
{
  console.log(base64UrlVerify(process.argv[2]));
}

// NodeJS Support
module.exports = base64UrlVerify;