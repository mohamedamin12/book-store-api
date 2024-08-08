const jwt = require("jsonwebtoken");

// Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  } else {
    res.status(401).json({ message: "No Token Provided" });
  }
};

// Verify Token & Authorization
const verifyTokenAndAuthorization = (req,res,next) => {
  verifyToken(req,res,()=>{
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    }else {
      return res.status(403).json({ error: "Unauthorized" }); // 403 Forbidden
    }
  });
}

// Verify Token & Is Admin 
const verifyTokenAndAdmin = (req, res , next) => {
  verifyToken(req,res, ()=> {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ error: "You Are Not Allowed, Only Admin Allowed"}); // 403 Forbidden
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
};
