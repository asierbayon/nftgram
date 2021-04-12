const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.middleware');
const assets = require('../controllers/assets.controller');
const users = require('../controllers/users.controller');
const follow = require('../controllers/follow.controller');

router.get('/assets/:id', assets.get);
router.post('/assets', assets.create);
router.delete('/assets/:id', assets.delete);


router.post('/login', users.login);
router.post('/logout', users.logout);
router.get('/profile', secure.isAuthenticated, users.profile);

router.post('/users', users.create);
router.get('/:username', users.get);

router.post('/:username/follow', secure.isAuthenticated, follow.followUser);
router.post('/:username/unfollow', secure.isAuthenticated, follow.unfollowUser);
router.get('/:username/followers', follow.listFollowers);
router.get('/:username/following', follow.listFollowing);

router.post('/totp', users.totp);

module.exports = router;