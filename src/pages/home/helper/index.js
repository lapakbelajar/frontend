import jwt from "jsonwebtoken";
/**
 * melakukan pengecekan ( authentication )
 * @param {String} token jsonwebtoken token
 * @param {String} jwt_key jsonwebtoken key
 * @returns {Boolean} login true jika login dan false jika tidak login atau error
 * @returns {Object} user data user
 */

export function isUserLogin(token, jwt_key) {
  let login = false;
  let user = {};

  jwt.verify(token, jwt_key, (err, decoded) => {
    if (err) {
      login = false;
      console.log("token : ", token)
      console.log("login error ", err)
    } else {
      login = true;
      user = decoded;
    }
  });

  return {
    login: login,
    user: user,
  };
}
