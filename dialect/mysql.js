const { RegisterDialect } = require("./index.js")

class Mysql {
    DataTypeOf(){

    }
    TableExistSQL(){

    }
}

let mysql = new Mysql()

RegisterDialect("mysql",mysql)