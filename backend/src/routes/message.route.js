import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import {getUsersForSidebar, getMessages, sendMessage} from "../controllers/message.controller.js"
const Router = express.Router()

Router.get('/user',protectRoute,getUsersForSidebar)
Router.get('/:id',protectRoute,getMessages)
Router.post('/send/:id',protectRoute,sendMessage)


export default Router