import { Router } from 'express'
import { facultyControllers } from './faculty.controllers'

const router = Router()

router.get('/', facultyControllers.getAllFaculties)
router.get('/:id', facultyControllers.getSingleFaculty)
router.patch('/:id', facultyControllers.updateFaculty)
router.delete('/:id', facultyControllers.deleteFaculty)

export const FacultyRouter = router
