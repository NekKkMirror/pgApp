const router = require('express').Router()
const controller = require('../controllers/controller')

router.get('/', controller.getStudents)
router.get('/:id', controller.getStudentById)
router.post('/', controller.addStudent)
router.delete('/:id', controller.deleteStudent)
router.put('/:id', controller.updateStudent)

module.exports = router