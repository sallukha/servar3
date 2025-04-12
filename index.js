const express = require("express")
const app = express()
require('./db/config')
const model = require('./model/user_model')

app.use(express.json())
const cors = require('cors');
app.use(cors());

const port = 3000

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await model.findOne({ email, password })

        if (!user) {
            return res.status(404).json({ message: "Invalid user credentials" })
        }

        res.status(200).json({ message: "Login successful", user })
    } catch (error) {
        console.error("Login error:", error)
        res.status(404).json({ message: "An error occurred during login", error: error.message })
    }
})

// Signup Route
app.post('/sign_up', async (req, res) => {
    const { fullname,email, password, confirmPassword } = req.body

    try {
        const existingUser = await model.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" })
        }

        const newUser = new model({ fullname, email, password, confirmPassword })
        const data = await newUser.save();

        res.status(201).json({ message: "Signup successful", data })
    } catch (error) {
        console.error("Signup error:", error)
        res.status(404).json({ message: "An error occurred during signup", error: error.message })
    }
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
