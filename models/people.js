require("dotenv").config()
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const url = process.env.ATLAS_URI

console.log(`connecting to ${url}`)

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then((result) => {
		console.log(`connected to MongoDB`)
	})
	.catch((error) => {
		console.log(`Error connecting to MongoDB ${error.message}`)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	number: {
		type: String,
		required: true,
		minlength: 8,
	},
})

personSchema.plugin(uniqueValidator)

// this renames _id to id and removes the _v key
personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model("Person", personSchema)
