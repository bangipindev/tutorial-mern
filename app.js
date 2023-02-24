const createError     = require('http-errors');
const express         = require('express');
const path            = require('path');
const cookieParser    = require('cookie-parser');
const logger          = require('morgan');

const dotenv          = require('dotenv')
const db              = require('./config/database');
const routes          = require('./routes/index');

dotenv.config()
const app             = express();

db.sync({force: false}).then(() => {
  console.log(`Berhasil terhubung ke database`);
}).catch(function(error){
  console.log(`Gagal terhubung ke database`, error)
  process.exit()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


routes(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    success : false,
    error: err.message || "Server Error"
})
  // res.render('error');
});

module.exports = app;
