const express = require('express');
const _ = require('lodash');
const cards = require('../controllers/cards');

const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, cards.createCard);
router.get('/my-cards', auth, cards.myCards);
router.get('/:id', cards.getCard);
router.patch('/:id', auth, cards.editCard);
router.delete('/:id', auth, cards.deleteCard);
router.get('/', cards.getAllCards);
router.get('/favs', auth, cards.getUserFavoriteCards);
router.post('/:id', auth, cards.setFavorite);

module.exports = router;
