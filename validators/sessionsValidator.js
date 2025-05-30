const validator = require('../helpers/validate');

const sessionValidation = (req, res, next) => {
  const validationRules = {
    userId: 'required|string',
    gameId: 'required|regex:/^[0-9a-fA-F]{24}$/',
    date: 'required|date',
    startTime: 'required|string',
    duration: 'required|string',
    players: 'required|array',
    mode: 'required|string',
    platform: 'required|string',
    notes: 'required|string',
    status: 'required|string|in:planned,ongoing,completed,cancelled'
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

module.exports = { sessionValidation };
