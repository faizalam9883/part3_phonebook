const mongoose = require("mongoose")

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://faizalam:${password}@cluster0.7luhm.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
	Person.find({}).then((result) => {
		console.log("phonebook:")
		result.forEach((person) => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
} else if (process.argv.length === 5) {
	const person = new Person({
		name,
		number,
	})

	person.save().then(() => {
		console.log(`added ${name} number ${number} to phonebook`)
		mongoose.connection.close()
	})
} else {
	console.log("Error: You entered the wrong arguments")
	process.exit(1)
}
