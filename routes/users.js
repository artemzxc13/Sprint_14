const router = require('express').Router();
const {
  getUsers, getUser, updateAvatar, updateUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
