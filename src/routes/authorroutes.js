const express = require('express');
const authorControllers = require('../author/authorcontrollers');

const router = express.Router();

router.post('/authors', authorControllers.addAuthor);
router.get('/authors', authorControllers.getAuthorByName);

module.exports = router;

