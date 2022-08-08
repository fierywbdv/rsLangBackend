const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const multer = require('../../core/multer');
const userService = require('./user.service');
const { id, user } = require('../../utils/validation/schemas');
const {
  validator,
  userIdValidator
} = require('../../utils/validation/validator');

router.post(
  '/',
  validator(user, 'body'),
  multer.single('avatar'),
  async (req, res) => {
    console.log(req.body, req.file)
    await userService.save(req.body, req.file);
    res.status(200).json('UserCreated');
  }
);

router.get(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    const userEntity = await userService.get(req.params.id);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.put(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  validator(user, 'body'),
  multer.single('avatar'),
  async (req, res) => {
    await userService.update(req.params.id, req.body, req.file);
    res.status(200).json('userUpdated');
  }
);

router.delete(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  }
);

module.exports = router;
