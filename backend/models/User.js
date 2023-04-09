const {Schema, model} = require('mongoose')

const User = new Schema({
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	role: {type: String, ref: 'Role', required: true},
	phone: {type: String},
	login: {type: String},
	orgName: {type: String},
	post: {type: String},
	name: {type: String},
	surname: {type: String},
	patronimyc: {type: String},
	INN: {type: String},
	KPP: {type: String},
	level: {type: Number, default: 0},
	ep: {type: String, default:'None'},
	giftCounter : {type: Number, default: 0},
	money: {type: Number, default: 0},
	cardBg : {type: String, default: ""},
	targetValue: {type: Number, default: 0},
	realValue : {type: Number, default: 0}
})

module.exports = model('User', User)