import express from "express"

import * as clientController from "../controllers/clientController.js"
import * as bookController from "../controllers/bookController.js"

const router = express.Router()

router.post('/clients/register', clientController.createClient)
router.post('/clients/login', clientController.loginClient)
router.post('/clients/logout', clientController.logoutClient)
router.get('/clients/home/:id', clientController.getClient)
router.get('/clients/search', clientController.searchClients)
router.get('/clients/:social_handle', clientController.getUserProfile)
router.post('/clients/follow', clientController.followUser)
router.post('/clients/unfollow', clientController.unfollowUser)
router.get('/clients/:profileId/followers', clientController.getFollowers);
router.get('/clients/:profileId/following', clientController.getFollowing);

router.post('/books/newBook', bookController.addBooks)
router.delete('/books/:bookId', bookController.deleteBook);
router.put('/books/:bookId', bookController.editBook)
router.get('/books/forYou/:id', bookController.getBooksForYou)
router.get('/books/following/:id', bookController.getBooksFollowing)
router.get('/books/search/:title', bookController.getBookSearch)
router.get('/books/:social_handle', bookController.getBookBySocialHandle)
router.post('/books/like', bookController.toggleLike)
router.get('/books/:bookId/likers', bookController.getLikers)
router.get('/books/metrics/:title', bookController.getBookMetrics);

export default router