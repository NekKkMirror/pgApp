const express = require('express')
const studentsRoute = require('./routes/students')
const db = require('./config/db')

const PORT = process.envPORT || 3030
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/students', studentsRoute)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
