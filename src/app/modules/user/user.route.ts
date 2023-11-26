import express from 'express'
import { UserControllers } from './user.controllers'

const router = express.Router()

router.post('/create-student', UserControllers.createStudent)
// router.post('/create-faculty', UserControllers.createFaculty)
// router.post('/create-admin', UserControllers.createAdmin)

export const UserRouter = router
