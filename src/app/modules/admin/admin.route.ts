import { Router } from 'express'
import { adminControllers } from './admin.controllers'

const router = Router()
router.get('/', adminControllers.getAllAdmin)
router.get('/:id', adminControllers.getSingleAdmin)
router.delete('/:id', adminControllers.deleteAdmin)
router.patch('/:id', adminControllers.updateAdmin)

export const AdminRouter = router
