const validator = require('../helpers/validate');

const gameValidation = (req, res, next) => {
  const validationRules = {
    title: 'required|string',
    platform: 'required|string',
    genre: 'required|string',
    multiplayer: 'required|string',
    developer: 'required|string'
  };
  validator(req.body, validationRules, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = { gameValidation };
