
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuthenticated = (req, res, next) => {

  
	const token = req.headers.token;
	if (!token) {
	  return res.status(401).json({ message: "Unauthorized: Missing token" });
	}
	  try {
		  const user = jwt.verify(token, process.env.JWT_SECRET);
	
		  req.user = user;
	  req.user.isAdmin = true;
			  
  
	  } catch (error) {
		  return res.send({ status: "FAIL", message: "Please login first" });
	  }
	next();
  };

  
module.exports = { isAuthenticated};