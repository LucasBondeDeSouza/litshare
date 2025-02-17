import express from "express"

import * as clientController from "../controllers/clientController.js"

const router = express.Router()

router.post('/clients/register', clientController.createClient)
router.post('/clients/login', clientController.loginClient)

export default router