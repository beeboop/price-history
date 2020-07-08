import jwt from 'jsonwebtoken';

export const APP_SECRET = 'price-hiiistoooory'

export const getUserId = (authorization) => {
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET) as any;
    return userId
  }

  throw new Error('Not authenticated')
}
