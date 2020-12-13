const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("build")) // this helps in serving static files from the production build of the frontend

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendick",
		number: "39-23-6423122",
	},
]
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
// it returns the persons array json
app.get("/api/persons", (request, response) => {
	response.json(persons)
})

// this returns the page for localhost/info
app.get("/info", (request, response) => {
	const str = `<p>Phonebook has info for ${persons.length} people.</p>
                 <p>${new Date().toString()}</p>`
	response.send(str)
})

// this returns the person matching its id
app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find((person) => person.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

// this deletes the resource matching the id
app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter((person) => person.id !== id)
	response.status(204).end()
})

const generateId = () => {
	let id = Math.floor(Math.random() * 100) + persons.length
	return id
}

app.post("/api/persons", (request, response) => {
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

	// this checks whether name is already in the persons array
	let flag = 0
	persons.forEach((p) => {
		if (person.name === p.name) {
			flag += 1
		}
	})
	if (flag > 0) {
		return response.status(400).json({
			error: "name must be unique",
		})
	}
	person.id = generateId()
	persons = persons.concat(person)
	response.json(person)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
})
