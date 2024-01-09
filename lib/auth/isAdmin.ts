import { jwtVerify } from "jose";

export const isAdmin = async (req) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const secret = new TextEncoder().encode(JWT_SECRET);

  const { payload } = await jwtVerify(req.cookies.token, secret);

  if (payload.email === process.env.ADMIN) {
    return true;
  }

  return false;
};
