import express from "express"

import * as clientController from "../controllers/clientController.js"
import * as bookController from "../controllers/bookController.js"

const router = express.Router()

router.post('/clients/register', clientController.createClient)
router.post('/clients/login', clientController.loginClient)
router.get('/clients/home/:id', clientController.getClient)
router.get('/clients/search', clientController.searchClients)
router.post('/clients/follow', clientController.followUser);
router.post('/clients/unfollow', clientController.unfollowUser);

router.get('/books/home/:id', bookController.getBooks)
router.post('/books/like', bookController.toggleLike)
router.get('/books/:bookId/likers', bookController.getLikers);

export default router