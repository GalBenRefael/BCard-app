const express = require('express');
const users = require('../controllers/users');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const cards = require('../controllers/cards');

const _ = require('lodash');

router.post('/login', users.login);
router.post('/verify-token', requireAuth, users.verifyToken);
router.post('/register', users.register);
router.get('/cards', requireAuth, users.myCards);
router.get('/myuser/:id', requireAuth, users.myUser);
router.get('/', requireAuth, users.allUsers);
router.post('/favorite/:businessId', requireAuth, users.favorite);
router.delete('/:id', requireAdmin, users.delete);
router.patch('/:id', requireAuth, users.edit);

module.exports = router;
