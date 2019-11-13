const util = require('util');
const mysql = require('mysql');
//connection  to the database

const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password:'dhairya',
    database:'www'
});

pool.getConnection((err,connection)=>{
    if(err)
        console.log("Something went wrong connecting to the database..");
    
    if(connection)
        connection.release();
    
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;