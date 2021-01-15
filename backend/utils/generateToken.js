import jwt from 'jsonwebtoken';

// this function generates token which takes id as a parameter
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
