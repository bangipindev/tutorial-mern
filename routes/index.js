var express               = require('express');
var indexRouter           = express.Router();
var usersRouter           = express.Router();

const { UserController }  = require('../app/controllers');

const routes = (app) => {

    /* GET home page. */
    indexRouter.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    /* GET users listing. */
    usersRouter.get('/', UserController.getAllUser)
  
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
}

module.exports = routes;
