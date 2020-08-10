const express = require("express")
const server = express()
const db = require("./database")

server.use(express.json())

//Getting Home Info
server.get("/", (req, res) => {
	res.json({ message: "Hello, World" })
})

//Getting List of Users
server.get("/api/users", (req, res) => {
    const users = db.getUsers()

    if (users) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ message: "The users information could not be retrieved." })
    }
})

//Getting Users by ID
server.get("/api/users/:id", (req, res) => {
	const id = req.params.id
	const user = db.getUserById(id)

	if (user) {
		res.json(user)
	} else if (!user) {
        res.status(500).json({ message: "User not found." })
    } else {
		res.status(404).json({ message: "The user with the specified ID does not exist." })
	}
})

//Adding New User
server.post("/api/users", (req, res) => {
    const addUser = db.createUser({
        name: req.body.name
    })
    if (!req.body.name || !req.body.bio) { 
        res.status(400).json({message: "Please provide name and bio for the user."})
    } else

    res.status(201).json(addUser)

    if(!db.users.find(obj => obj.user === newUser)) {
        res.status(201).json(newUser);
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
    }
})


//Updating Existing User
server.put("/api/users/:id", (req, res) => { 
    const id = req.params.id
    const data = req.body
    const updateUser = db.updateUser(id, data)

    if (!updateUser) {
        res.status(404).json({message: "The user with the specified ID does not exist." })
    } else if (!data.name || !data.bio) {
        res.status(400).json({errorMessage: "Please proivde name and bio for the user"})
    } else {
        res.status(200).json(updateUser)
    }
})

//Deleting Existing User
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)


    if (user) {
        db.deleteUser(id)
        res.status(204).end()
    } else { 
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

})


server.listen(8080, () => {
    console.log("Server on port 8080")
})