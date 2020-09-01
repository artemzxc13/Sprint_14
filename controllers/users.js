const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const PasswordValidator = require('password-validator');
const User = require('../models/user');
const { key } = require('../datadb/jwt');
const { errorСhecking } = require('../middlewares/err');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return User.findById(req.params.userId)
      .orFail()
      .then((user) => res.send({ data: user }))
      .catch((err) => errorСhecking(err, res));
  }
  return res.status(400).send({ message: 'Неверный формат id пользователя' });
};

const schema = new PasswordValidator();
schema
  .is().min(8)
  .is().max(16)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();
// https://github.com/tarunbatra/password-validator

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password) return res.status(400).send({ message: 'Пароль - Обязательное поле' });
  if (!schema.validate(password)) {
    return res.status(400).send({ message: 'Пароль должен быть от 8 до 16 знаков' });
  }
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        if (err.errors.email && err.errors.email.kind === 'unique') {
          return res.status(409).send({ message: err.message });
        }
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => errorСhecking(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => errorСhecking(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'Email должен быть заполнен' });
  if (!password) return res.status(400).json({ message: 'Пароль должен быть заполнен' });
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, key, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'strict',
      }).end();
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};
module.exports = {
  getUsers, getUser, createUser, updateAvatar, updateUser, login,
};
