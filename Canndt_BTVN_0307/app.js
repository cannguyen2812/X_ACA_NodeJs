const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var students = [{id: 108, name: 'nguyen van a', phone: 1234567899}, {id: 200, name: 'Hung Le', phone: 1235556987}];
var errorMessage = ''



// read Students
// app.get('/api/students', (req, res) => {
//     res.status(200).json(students)
// }) 

// read student by id
// type 1: url path/ path variable/ query string
// app.get('/api/students/:id', (req, res) => {
//     const { id } = req.params
//     res.status(200).json(students.find(m => m.id == id))
// })
//type 2: request/ query params (BTVN2)
app.get('/api/students', (req, res) => {
    const { id } = req.query;
    if ( id != null ) {
        res.status(200).json(students.find(m => m.id == id))
    } 
    res.status(200).json(students)
})

//create new student
app.post('/api/students', (req, res) => {
    const newStudent = req.body;
    if(newStudent != null && isValidate(newStudent) ) {
        students.push(newStudent);
        res.status(201).json(newStudent);
    }
    const validationModel = {source: 'createStudent()', destination: 'isValidate()', errorMessage: errorMessage}
    res.status(400).json(validationModel)
})

//update a student by id
// app.put('/api/students/:id', (req, res) => {
//     const { id } = req.params;
//     const oldStudent = students.find(s => s.id == id)
//     if(oldStudent != null) {
//         const newStudent = req.body;
//         oldStudent.name = newStudent.name;
//         res.status(204).json();
//     }

//     res.json('error')
// })

//BTVN 3 
app.put('/api/students', (req, res) => {
    const newStudent = req.body;
    const oldStudent = students.find(s => s.id == newStudent.id)
    if(oldStudent != null) {
        oldStudent.name = newStudent.name;
        res.status(204).json();
    }

    res.json('error')
})

//delete a student by id
app.delete('/api/students/:id', ( req,res ) => {
    const { id } = req.params;
    const oldStudentIndex = students.findIndex(s => s.id == id)
    if(oldStudentIndex != -1) {
        students.splice(oldStudentIndex,1)
        res.status(204).send();
    }
    
    res.json('error')
})

//BTVN 4: validate student available, validate phone number 
function isValidate(student) {
    isStudentAvailable = students.find(s => s.id == student.id);
    if( isStudentAvailable ) {
        errorMessage = 'Student is available';
        return false;
    }

    if(student.name.length > 50) {
        errorMessage = 'Student Name must be less than equal 50'
        return false
    } else if (isNaN(student.phone)) {
        errorMessage = 'Phone must be numberic';
        return false
    } else if (!isNaN(student.phone)) {
        if ( student.phone.toString().length > 10 ) {
            errorMessage = 'Phone must be less than or equal to 10';
            return false
        }
    }
    return true
}


app.listen(5000, () => {
    console.log("First Nodejs application");
})