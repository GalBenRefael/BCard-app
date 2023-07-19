const express = require('express');
const users = require('../controllers/users');
const router = express.Router();
const auth = require('../middleware/auth');
const cards = require('../controllers/cards');

const _ = require('lodash');

router.post('/login', users.login);
router.post('/verify-token', auth, users.verifyToken);
router.post('/register', users.register);
router.get('/cards', auth, users.myCards);
router.get('/myuser/:id', users.myUser);
router.get('/', users.allUsers);
router.post('/favorite/:businessId', auth, users.favorite);
router.delete('/:id', users.delete);
router.patch('/:id', users.edit);

module.exports = router;
