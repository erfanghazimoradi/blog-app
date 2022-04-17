const express = require('express');
const router = express.Router();

const articleRoute = require('./article-route');
const commentRoute = require('./comment-route');
const avatar = require('../controllers/avatar-controller');
const account = require('../controllers/account-controller');
const validation = require('../controllers/validation-controller');

// blogger profile
router.get('/', account.profile);

// update profile
router.patch('/', validation.update(), validation.validator2, account.edit);

// change password
router.put('/', validation.changePassword(), validation.validator2, account.password);

// delete account
router.delete('/', account.remove);

// change blogger avatar
router.put('/avatar', avatar.avatar);

// remove blogger avatar
router.delete('/avatar', avatar.removeAvatar);

// blogger article route
router.use('/article', articleRoute);

// blogger comment route
router.use('/comment', commentRoute);

module.exports = router;
