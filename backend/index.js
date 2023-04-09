const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const procedureRouter = require('./procedureRouter')
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL || 'mongodb+srv://w3htt4mk:Gods_Plan@rlthack.sjsd57q.mongodb.net/?retryWrites=true&w=majority'

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

app.use("/procedure", procedureRouter)

const start = async () => {
	try {
		await mongoose.connect(DB_URL)
		app.listen(PORT, () => {console.log('Server OK on PORT ' + PORT)})
	} catch (e) {
		console.log(e)
	}
}

start()