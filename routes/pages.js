const express = require('express');
const User = require('../core/user');
const router = express.Router();


const user = new User();
//get index page

router.get('/',(req,res,next) => {
    let user = req.session.user;
    if(user){
        res.redirect('/home');
        return;
    }
    res.render('index', {title:"My Application"});
} )
 // Get home Page
 router.get('/home', (req,res,next)=>{
     let user = req.session.user;

     if(user){
         res.render('home',{opp:req.session.opp,name:user.fullname});
         return;
     }
     res.redirect('/');
 });

 //Post login data
 router.post('/login',(req,res,next)=>{
     user.login(req.body.email,req.body.password,function(result){
        if(result)
        {
            req.session.user = result;
            req.session.opp=1;

            res.redirect('/home');
        }
        else{
            res.send('Incorrect Credentials');
        }
     });
 });

 //post register data

 router.post('/register',(req,res,next) => {
    let userInput ={
        fullname: req.body.fullname,
        password: req.body.password,
        college:req.body.college,
        email: req.body.email
    };
    user.create(userInput,function(lastId){
         if(lastId){
            user.find(lastId,function(result){
                req.session.user = result;
                req.session.opp =0;
                res.redirect('/home');
            })
        }
        else{
            res.send("User already exists");
        }
    });
 });

//get logout
router.get('/logout',(req,res,next)=>{
    if(req.session.user){
        req.session.destroy(function(){
            res.redirect('/');
        });
    }
});

module.exports = router;