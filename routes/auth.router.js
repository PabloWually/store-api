const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');
const validatorHandler = require('../middlewares/validator.handler');
const { changePasswordSchema } = require('../schemas/user.schema');

const router = express.Router();
service = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      token = service.signToken(user);
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta)
    } catch (error) {
      next(error)
    }
});

router.post('/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { password, recoveryToken } = req.body;
      const rta = await service.changePassword(password, recoveryToken);
      res.json(rta)
    } catch (error) {
      next(error)
    }
});

module.exports = router;