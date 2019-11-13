const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');
const app = express();
//for body parser
app.use(express.urlencoded({extended : false}));

//serve static files

app.use(express.static(path.join(__dirname,'public')));

//tempelate engine

app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

//session
app.use(session({
    secret:'registerlogin',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 60*1000*30
    }
}));


// routers
app.use('/',pageRouter);


//errors : page not found
app.use((req,res,next)=>{
    var err = new Error('Page not Found');
    err.status = 404;
    next(err);
});
//handling error
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send(err.message);
})
//setting up the server

app.listen(3000,()=>{
    console.log('server is running on port 3000...');
});

module.exports = app;