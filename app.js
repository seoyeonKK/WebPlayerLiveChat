/*
 Default module
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

app.use((req, res, next) => {
  res.r = (result) => {
      res.json({
          status: true,
          message: "success",
          result,
      });
  };
  next();
});
/*
 Custom module
*/
const routes = require('./routes/player');
const recommendVideoRoutes = require('./routes/recommendVideo')

/*
 app.set
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/*
 app.use
*/
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',routes);
app.use('/',recommendVideoRoutes);

// error handler
require('./ErrorHandler')(app);

app.use(function(req, res, next)
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next)
{
  res.locals.message = err.message;
  // console.log("res.locals.message error : " + res.locals.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // console.log("res.locals.error error : " + res.locals.error);

  res.status(err.status || 500);
  res.render('error',{errLog : res.locals.error});
});

module.exports = app;