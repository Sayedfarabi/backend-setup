import { Router } from 'express'
import { adminControllers } from './admin.controllers'

const router = Router()
router.get('/', adminControllers.getAllAdmin)
router.get('/:adminId', adminControllers.getSingleAdmin)
router.delete('/:adminId', adminControllers.deleteAdmin)
router.patch('/:adminId', adminControllers.updateAdmin)

export const AdminRouter = router
