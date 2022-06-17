const print = require("./print")
const opensql = require("./opensql")
const dialect = require("./dialect")
const mysql = require("mysql")
const { session } = require("./session")

class Engine {
    /**
     * @param {mysql.Connection} db 
     * @param {any} dialect 
     */
    constructor(db,dialect){
        this.db = db
        this.dialect = dialect
    }

    /**
     * close database
     * @returns {boolean}
     */
    close(){
        if(this.db === undefined){
           print.error("db is undefined")
            return false
        }
        //TODO Do I need promise?
        this.db.end((err) => {
            if(err){
                print.error("Close database error:",err)
            }else{
                print.info("Close database success")
            }
        })
        return true
    }
    
    /**
     * open a session for performing SQL operations 
     * @returns {session}
     */
    newSession(){
        return new session(this.db,this.dialect)
    }
}

exports.MYSQL = "MYSQL"

/**
 * get a connetion Engine
 * @param {string} driver
 * @param {mysql.ConnectionConfig} config
 * @return {Engine}
 */
exports.createConnection = async function(driver,config){
    driver = driver.toUpperCase()
    let db = await opensql.getConnection(driver,config)
    if(db === undefined){
        print.error(`Temporarily unsupported ${driver}`)
        return new Engine()
    }
    let dial = dialect.getDialect(driver)
    let e = new Engine(db,dial)
    print.info("Connection database success")
    return e
}