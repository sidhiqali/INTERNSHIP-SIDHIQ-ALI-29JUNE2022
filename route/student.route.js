const express = require("express");
const router = express.Router();
const Student = require("../model/student.model");

//create student

router.post("/new", async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    const saveStudent = await newStudent.save();
    res.status(200).json(saveStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update student class using aggregate and $lookup
router.put('/update', async(req, res)=>{
Student.aggregate([{$lookup: {
    from: 'classes',
    localField: 'id',
    foreignField: 'classId',
    as: 'class'
   }}, {$addFields: {
    class: {
     $first: '$class',
       
    }
   }}, {$merge: {
    into: 'students',
    whenMatched: 'replace',
    whenNotMatched: 'discard'
   }}]
   ).exec((err, result) => {
           if (err) throw err;
           res.send(result)
         });
})

//delete class
router.delete('/:id', async(req, res)=>{
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Post has been deleted successfully', student})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Read All Students in a class with standard and division.
router.get('/', async(req, res)=>{
    try {
        const students = await Student.find({"class":{"$elemMatch":{"division":1,"standard":1}}})
        res.status(200).json(students)
       
    } catch (error) {
        res.status(500).json(error)
    }
})

//Read All Students in a standard.
router.get('/class', async(req, res)=>{
    try {
        const students = await Student.find({"class":{"$elemMatch":{"standard":{$eq:[10]}}}})
        res.status(200).json(students)
       
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;
