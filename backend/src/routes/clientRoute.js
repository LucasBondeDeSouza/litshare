import express from "express"

import * as clientController from "../controllers/clientController.js"

const router = express.Router()

router.post('/clients', clientController.createClient)
router.get('/clients', clientController.loginClient)

export default router