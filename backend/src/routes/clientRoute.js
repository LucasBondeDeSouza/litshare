import express from "express"

import * as clientController from "../controllers/clientController.js"

const router = express.Router()

router.post('/clients/register', clientController.createClient)
router.post('/clients/login', clientController.loginClient)
router.get('/clients/home/:id', clientController.getClient);
router.get('/clients/search', clientController.searchClients)

export default router