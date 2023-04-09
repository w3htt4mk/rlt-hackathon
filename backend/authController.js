const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'Gods_Plan'
const {validationResult} = require('express-validator')

const generateAccessToken = (id, role) => {
	const payload = {
		id,
		role,
	}
	return jwt.sign(payload, secret, {expiresIn: "24h"})
}


class authController {
	async registration(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({message: 'Validation error', errors})
			}
			const {email, password, userRole} = req.body
			const candidate = await User.findOne({email})
			if (candidate){
				return res.status(400).json({message: "Already exists"})
			}
			const hashPassword = bcrypt.hashSync(password, 7)
			const user = new User({...req.body, password:hashPassword})
			await user.save()
			return res.json({message: "Succesfully registered"})
		} catch (e) {
			console.log(e)
			res.status(400).json({message: 'Registration error'})
		}
	}

	async login(req, res) {
		try {
			const {email, password} = req.body
			const user = await User.findOne({email})
			if (!User) {
				return res.status(400).json({messgae: "No user with this email"})
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return res.status(400).json({messgae: "Invalid password"})
			}
			const token = generateAccessToken(user._id, user.role)
			return res.json({token})
		} catch (e) {
			console.log(e)
			res.status(400).json({message: 'Login error'})
		}
	}

	async update(req, res) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token){
				return res.status(403).json({message: "Not authorized"})
			}
			const decodedData = jwt.verify(token, secret)
			console.log(decodedData)
			const id = decodedData.id

			const user = await User.findByIdAndUpdate({_id: id}, {...req.body})
			res.status(200).json({message: "Updated"})
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = new authController()