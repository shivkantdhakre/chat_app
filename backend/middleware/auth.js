import { verifyToken, extractTokenFromHeader } from "../utils/jwt.js";

export const authenticateToken = (req, res, next) => {
  const token = extractTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.user = decoded;
  next();
};

export const optionalAuth = (req, res, next) => {
  const token = extractTokenFromHeader(req);

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }

  next();
};
