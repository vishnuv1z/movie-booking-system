const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and attach user to request
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid or has expired" });
  }
};

// Middleware to restrict access based on user roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied: insufficient permissions" });
    }
    next();
  };
};

module.exports = { protect, authorize };