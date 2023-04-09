const Procedure = require('./models/Procedure')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || "Gods_Plan"

class procedureController {
	async create(req, res) {
		try {
			const {Name, Description, Price, Category, RegionCode, Region, EventMethod, OKPD2, AuctionRegistrationNumber, DepositSize, DepositCurrency, ContractSize, ContractCurrency, ArrangerINN, ArrangerKPP, Currency} = req.body
			const candidate = await Procedure.findOne({AuctionRegistrationNumber})
			if (candidate){
				return res.status(400).json({message: "Already exists"})
			}
			
			const token = req.headers.authorization.split(' ')[1]
			if (!token){
				return res.status(403).json({message: "Not authorized"})
			}
			const decodedData = jwt.verify(token, secret)
			const CustomerId = decodedData.id
			//const Customer = await User.findById(CustomerId)
			//console.log(Customer.email)
			const procedure = new Procedure({Name, Description, Price, Category, Customer: CustomerId, RegionCode, Region, EventMethod, OKPD2, AuctionRegistrationNumber, DepositSize, DepositCurrency, ContractSize, ContractCurrency, ArrangerINN, ArrangerKPP, Currency, CustomerId})
			await procedure.save()
			return res.json({message: "Succesfully created procedure"})
		} catch (e) {
			console.log(e)
			res.status(400).json({message: 'Creation procedure error'})
		}
	}
}

module.exports = new procedureController()