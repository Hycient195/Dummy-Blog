const { Router } = require('express')
const router = Router()



const getHandler = require('../controllers/get_handler')
const postHandler = require('../controllers/post_handler')
const deleteHandler = require('../controllers/delete_handler')
const checkUser = require('../middlewares/checkUser')
const authenticator = require('../middlewares/authenticator')



router.get('*', checkUser)

/* GET requests  */
router.get('/', getHandler.homepage_redirect)

router.get('/home', getHandler.homepage_get)

router.get('/new-post', authenticator, getHandler.new_post_get)

router.get('/blogs/:_id', getHandler.single_blog_get)

router.get('/login-page', getHandler.login_page_get)

router.get('/sign-up-page', getHandler.signup_page_get)

router.get('/blog-posts/search', getHandler.search_post_get)

router.get('/logout', getHandler.logout_get)


/* POST requests */
router.post('/sign-up', postHandler.signup_post)

router.post('/login', postHandler.login_post)

router.post('/new-post', postHandler.new_post_post)

/* Delete Requests */
router.delete('/blogs/delete/:_id', deleteHandler.delete_post)
// // router.get('/')
// // router.get('/')
// // router.get('/')
// // router.get('/')

// router.post('/')
// router.post('/')
// router.post('/')
// router.post('/')

module.exports = router