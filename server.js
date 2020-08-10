// pulling the dependencies
const express = require("express")
const db = require("./database.js")
const database = require("./database.js")

// creating a new server
const server = express()

server.get("/", (req, res) => {
    res.json({ message: "Hello, World" })
})

// getting users from the database
server.get("/users", (req, res) => {
    const users = db.getUsers()

    if (users) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ message: "The users information could not be retrieved." })
    }
})

// getting a specific user
server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

// error if the user ID is not found
    if (user) {
        res.json(user)
    } else if (!user) {
        res.status(500).json({ message: "User not found." })
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.post("/users", (req, res) => {
    const newUser = db.newUser({
        name: req.body.name
    })

// error if the request is missing the name or bio, if correct then status returns 201
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide a name and bio for the user." })
    } else {
        res.status(201).json(newUser)
    }

// error if there is already an existing user 
    if(!db.users.find(obj => obj.user === newUser)) {
        res.status(201).json(newUser);
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
    }
})

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

// error if the user ID is not found
    if (user) {
        db.deleteUser(req.params.id)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.put("/users/:id", (req, res) => {
    const id = req.params.id
    const updateUser = db.updateUser(id)

//error if ID, name, or bio is not found
    if (!updateUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!database.name || !database.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
    } else {
        res.status(200).json(updateUser)
    }
})

server.listen(8080, () => {
    console.log("Server started on port 8080")
})