import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import { comparePasswords, createJWT } from '../../lib/auth';
import { serialize } from 'cookie';

export default async function Signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    const isUser = await comparePasswords(req.body.password, user?.password);
    if (isUser) {
      //create jwt and set it on a cookie
      const jwt = await createJWT(user);
      res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME || '', jwt, {
          httpOnly: true, //cannot access cookies through js
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(201);
      res.end();
    } else {
      res.status(402);
      res.end();
    }
  }
}
