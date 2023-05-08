const UserService = require('./users.service');
const { config } = require('../config/config')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const service = new UserService();

class AuthService{

  async getUser(email, password){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    
    const payload = { sub: user.id};
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.updateUser(user.id, {recoveryToken: token});
    const mail = {
      from: `${config.mailUser}`,
      to: `${user.email}`,
      subject: "Recovery Password",
      html: `b>Please click the link: ${link} to recovery your password</b>`,
    }

    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(newPassword, token){
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findById(payload.sub);
      if (user.recoveryToken !== token){
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.updateUser(user.id, { recoveryToken: null, password: hash });
      return { message: 'Password Changed' }
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      connectionTimeout: 10000,
      auth: {
          user: config.mailUser,
          pass: config.mailPassword
      }
    });
    
    let info = await transporter.sendMail(infoMail);

    return { message: 'mail sent'}
  }
}

module.exports = AuthService;