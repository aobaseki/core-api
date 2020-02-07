/* eslint no-underscore-dangle: 0 */
import moment from 'moment';
import jwt from 'jsonwebtoken';

const jwtSecret = 'QKBKWEHjkbwfbewkj885767JVJBJBWdsvewjeh2232dftytrrw';

const initialUserDetails = {
  email: 'tester@elparah.com',
  iat: moment().unix(),
  exp: moment()
    .add(1, 'days')
    .unix(),
  name: 'El-Parah Tester',
  'https://elparah.com/authorization': {
    groups: [],
    permissions: [],
    roles: [],
  },
};

function adminSignedHeaders(userDetails) {
  return {
    Authorization: `Bearer ${jwt.sign(userDetails, jwtSecret)}`,
  };
}

module.exports = {
  initialUserDetails,
  adminSignedHeaders,
};
