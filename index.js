const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/people")
const { response } = require("express")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("build")) // this helps in serving static files from the production build of the frontend

morgan.token("body", (req, res) => JSON.stringify(req.body))

app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body",
		{ stream: console.log() }
	)
)

// this returns the page for the localhost root
app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>")
})

// this returns the page for /api/persons
// it returns the Person database from mongodb
app.get("/api/persons", (request, response, next) => {
	Person.find({})
		.then((people) => {
			response.json(people)
		})
		.catch((error) => next(error))
})

// this returns the page for localhost/info
app.get("/info", (request, response, next) => {
	Person.find({}).then((people) => {
		const length = people.length
		response.send(`<p>Phonebook has info for ${length} people.</p>
						<p>${new Date().toString()}</p>`)
	})
})

// this returns the person matching its id
app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

// this deletes the resource matching the id
app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then((result) => {
			response.status(204).end()
		})
		.catch((error) => next(error))
})

app.post("/api/persons", (request, response, next) => {
	const person = request.body

	if (!person.name) {
		return response.status(400).json({
			error: "name is missing",
		})
	}
	if (!person.number) {
		return response.status(400).json({
			error: "number is missing",
		})
	}

	const per = new Person({
		name: person.name,
		number: person.number,
	})

	per.save()
		.then((savedPerson) => {
			response.json(savedPerson)
		})
		.catch((error) => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body

	const per = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, per, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson)
		})
		.catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.log(error.message)
	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
})
