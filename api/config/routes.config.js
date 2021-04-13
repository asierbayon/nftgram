const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.middleware');
const assets = require('../controllers/assets.controller');
const users = require('../controllers/users.controller');
const follow = require('../controllers/follow.controller');
const like = require('../controllers/like.controller');
const comment = require('../controllers/comment.controller');

router.get('/feed', assets.feed);
router.get('/assets/:id', assets.get);
router.post('/assets', secure.isAuthenticated, assets.create);
router.delete('/assets/:id', secure.isAuthenticated, assets.delete);

router.post('/login', users.login);
router.post('/logout', users.logout);
router.get('/profile', secure.isAuthenticated, users.profile);

router.get('/users', users.search);
router.post('/users', users.create); // TBC: Change to '/'
router.get('/:username', users.get);

router.post('/:username/follow', secure.isAuthenticated, follow.followUser);
router.delete('/:username/follow', secure.isAuthenticated, follow.unfollowUser);

router.get('/:username/followers', follow.listFollowers);
router.get('/:username/following', follow.listFollowing);

router.post('/assets/:id/like', secure.isAuthenticated, like.likePost);
router.delete('/assets/:id/unlike', secure.isAuthenticated, like.unlikePost);
router.get('/assets/:id/likes', like.listLikes);

router.post('/assets/:id/comments', secure.isAuthenticated, comment.create);
router.delete('/assets/:id/comments/:commentId', secure.isAuthenticated, comment.delete);
router.get('/assets/:id/comments', comment.list);


module.exports = router;