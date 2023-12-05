import { Router } from 'express'
import { facultyControllers } from './faculty.controllers'

const router = Router()

router.get('/', facultyControllers.getAllFaculties)
router.get('/:facultyId', facultyControllers.getSingleFaculty)
router.patch('/:facultyId', facultyControllers.updateFaculty)
router.delete('/:facultyId', facultyControllers.deleteFaculty)

export const FacultyRouter = router
