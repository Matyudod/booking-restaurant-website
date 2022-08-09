function route(app){

    const customerRouter = require('./modules/customer/customer.routers');
    const adminRouter = require('./modules/admin/admin.routers');
    const authRouter = require('./modules/auth/auth.routers');



    //User Services
    app.use('/api/v1.0/customer', customerRouter);
    app.use('/api/v1.0/admin', adminRouter);
    app.use('/api/v1.0/', authRouter);


    app.use(function(req, res, next) {
        next(createError(404));
      });
      
      // error handler
      app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
      
        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });
}


module.exports = route;