const router = require('express').Router();

router.use('/users', require('../controller/users'));
router.use('/movies', require('../controller/movies'));
router.use('/taxonomy', require('../controller/taxonomy'));

router.use(function(err, req, res, next){
if(err.name === 'ValidationError'){
  return res.status(422).json({
    errors: Object.keys(err.errors).reduce(function(errors, key){
      errors[key] = err.errors[key].message;

      return errors;
    }, {})
  });
}

return next(err);
});

module.exports = router;
