const {Schema, model} = require('mongoose')

const Procedure = new Schema({
	Available: {type: Boolean, required: true, default: true},
	Name: {type: String, required: true},
	Description: {type: String, required: true},
	Price: {type: Number, required: true},
	Category: {type: Number, required: true},
	Customer: {type: String, required: true},
	RegionCode: {type: Number, required: true},
	Region: {type: String, required: true},
	EventMethod: {type: String, required: true},
	OKPD2: {type: String, required: true},
	AuctionRegistrationNumber: {type: String, required: true},
	DepositSize: {type: Number, required: true},
	DepositCurrency: {type: String, required: true},
	ContractSize: {type: Number, required: true},
	ContractCurrency: {type: String, required: true},
	GroundName: {type: String, required: true, default: "Коммерческие закупки и закупки по 223-ФЗ"},
	GroundURL: {type: String, required: true, default: "https://com.roseltorg.ru"},
	ArrangerINN: {type: Number, required: true},
	ArrangerKPP: {type: Number, required: true},
	Currency: {type: String, required: true},
	CustomerId : {type: String, required: true}
})

module.exports = model('Procedure', Procedure)