import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async (req, res, next) => {
  const token =
      req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    res.status(403).json(
        {error : 'You need to be autenticated to access this page.'});
    return;
  }
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_KEY);
    req.user = verifyToken;
  } catch (e) {
    return res.status(401).json({error : "token can't be authenticated"});
  }
  return next();
};
