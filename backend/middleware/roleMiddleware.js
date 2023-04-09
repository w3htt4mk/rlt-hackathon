const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || "Gods_Plan"
module.exports = function(role) {
	return function (req,res,next) {
		if(req.method === "OPTIONS") {
			next()
		}
	
		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token){
				return res.status(403).json({message: "Not authorized"})
			}
			const {role: userRole} = jwt.verify(token, secret)
			let hasRole = false
			if (role === userRole){
				hasRole = true
			}
			if (!hasRole) {
				return res.status(403).json({message: "No permission"})
			}
			next()
		} catch (e) {
			console.log(e)
			return res.status(403).json({message: "Not authorized"})
		}
	}
}