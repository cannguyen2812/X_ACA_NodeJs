const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var students = [{id: 108, name: 'nguyen van a'}, {id: 200, name: 'Hung Le'}];
var errorMessage = ''

// read Students
app.get('/api/students', (req, res) => {
    res.status(200).json(students)
}) 

app.get('/api/students/:id', (req, res) => {
    const { id } = req.params
    res.status(200).json(students.find(m => m.id == id))
})