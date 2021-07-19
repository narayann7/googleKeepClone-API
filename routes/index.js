import express from 'express'
const router = express.Router()
import registorController from '../controllers/registerController'
import loginController from '../controllers/loginController'
import whoAmIController from '../controllers/whoAmIcontroller'
import getAccessTokenController from '../controllers/getAccessTokenController'
import logoutController from '../controllers/logoutController'
import createNoteController from '../controllers/createNoteController'
import getAllNotesController from '../controllers/getAllNotesController'
import updateNoteController from '../controllers/updateNoteController'
import deleteNoteController from '../controllers/deleteNoteController'

import auth from '../middlewares/auth'

//authRoutes
router.post('/register', registorController.register)
router.post('/login', loginController.loginUser)
router.post('/logout',logoutController.logoutUser)
router.get('/whoAmI',auth, whoAmIController.whoAmI)
router.post('/refreshtoken', getAccessTokenController.getAccessToken)

//notesRoutes
router.post('/createNote',auth,createNoteController.createNote)
router.post('/updateNote',auth,updateNoteController.updateNote)
router.get('/getAllNotes',auth,getAllNotesController.getAllNotes)
router.get('/deleteNote',auth,deleteNoteController.deleteNote)




export default router