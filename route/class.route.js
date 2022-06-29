const router = require('express').Router()
const Class = require ('../model/class.model')
const Student = require('../model/student.model')

// Create Class

router.post('/new', async(req,res)=>{
    const newClass = new Class(req.body)
    try{
        const saveClass = newClass.save()
        res.status(200).json(saveClass)
    } catch(err){
        res.status(500).json(err)
    }
} )

// delete class

router.delete('/:id', async(req, res)=>{
    try {
        const clas = await Class.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Post has been deleted successfully', clas})
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router