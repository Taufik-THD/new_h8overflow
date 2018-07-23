var express = require('express');
var router = express.Router();
const { Login, Register } = require('../controllers/user_controller');
const { LoginGoogle, LoginGithub, Loginfb } = require('../controllers/socmed_controller')

/* GET users listing. */
router.get('/:id', (req, res) => {
  console.log('profile');
});

router.post('/', Login)

router.post('/register', Register)

router.post('/loginGithub', LoginGithub)

router.post('/loginfb', Loginfb)

router.post('/loginGoogle', LoginGoogle)


module.exports = router;
