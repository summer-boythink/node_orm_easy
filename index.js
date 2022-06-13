const logger = require("pino")()
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
     * @returns {boolean}
     */
    close(){
        if(this.db === undefined){
            logger.error("db is undefined")
            return false
        }
        //TODO Do I need promise?
        this.db.end((err) => {
            if(err){
                logger.error("Close database error:",err)
            }else{
                logger.info("Close database success")
            }
        })
        return true
    }
    
    /**
     * 
     * @returns {session}
     */
    newSession(){
        return new session(this.db,this.dialect)
    }
}

/**
 * @param {string} driver
 * @param {mysql.ConnectionConfig} config
 * @return {Engine}
 */
exports.createConnection = function(driver,config){
    let db = opensql.getConnection(driver,config)
    if(db === undefined){
        logger.fatal(`Temporarily unsupported ${driver}`)
        return new Engine()
    }
    let dial = dialect.getDialect(driver)
    let e = new Engine(db,dial)
    logger.info("Connection database success")
    return e
}