function randomString (len) {
  len = len || 32
  let baseString = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
  let string = ''
  for (i = 0; i < len; i++) {
    string += baseString.charAt(Math.floor(Math.random() * baseString.length))
  }
  return string
}

module.exports = {
  'clientId': 'dad0804b5df6ef0a867b',
  'clientSecret': '6a64070075a3bd3e31b508762a33219116737e1b',
  'scope': ['user'],
  'randomString': randomString(24)
}