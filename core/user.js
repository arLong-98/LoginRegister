const pool = require('./pool');
const bcrypt = require('bcrypt');


function User(){};

User.prototype = {
    //Find user data by id or username

    find: function(user,callback)
    {
        //if user =number return field=id, if user=string return field=username.
        if(user)
        {
            var field = 'email';

        }

        let sql = `SELECT *FROM users WHERE ${field}=?`;

        pool.query(sql,user,function(err,result) {
            if(err) throw err
            if(result.length){
                callback(result[0]);
            }
            else{
                callback(null);
            }
        });
    },

    create :function(body,callback)
    {
        this.find(body.email,function(user){
            if(user){
                callback(null);
            }

            else{
                let pwd = body.password;
                body.password = bcrypt.hashSync(pwd,10);
                var bind =[];
                for(prop in body){

                    bind.push(body[prop]);

                }
                
                let sql = `INSERT INTO users(fullname,password,college,email) VALUES(?,?,?,?)`;
                pool.query(sql,bind,function(err,result){

                    console.log(result);
                    if(err) throw err;
                    callback(body.email);
                });

            }
        });
        
    },

    login : function(email,password,callback)
    {
        console.log(email);
        this.find(email,function(user){
            if(user){
                
                if(bcrypt.compareSync(password,user.password)){
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    }
}

module.exports = User;