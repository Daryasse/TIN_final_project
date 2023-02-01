var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const aApiRouter = require('./routes/api/AuthApiRoute');

const  session = require('express-session');



var app = express();
const cors = require('cors');
app.use(cors());
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) =>{
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});

var indexRouter = require('./routes/index');
const booksRouter = require('./routes/BookRoute');
const authorsRouter = require('./routes/AuthorRoute');
const clientsRouter = require('./routes/ClientRoute');
const ordersRouter = require('./routes/OrderRoute');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/clients', clientsRouter);
app.use('/authors', authorsRouter);
app.use('/orders', ordersRouter);
app.use('/api/auth', aApiRouter);

const authApiRouter = require('./routes/api/AuthorApiRoute');
app.use('/api/authors', authApiRouter);
const bookApiRouter = require('./routes/api/BookApiRoute');
app.use('/api/books', bookApiRouter);
const orderApiRouter = require('./routes/api/OrderApiRoute');
app.use('/api/orders', orderApiRouter);
const clientApiRouter = require('./routes/api/ClientApiRoute');
app.use('/api/clients', clientApiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit().catch(err => {
  console.log(err);
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log(err.message)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
