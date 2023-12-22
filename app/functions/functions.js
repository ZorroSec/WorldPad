const mysql = require("mysql2")
const multer = require("multer")

class Functions{
    constructor(conn){
        this.conn = conn
    }

    query(sql){
        this.conn.query(sql, (results, fields)=>{
            return fields
        })
    }
}

module.exports = Functions