const logger = require("pino")()
const opensql = require("./opensql")
const dialect = require("./dialect")
const mysql = require("mysql")

class Engine {
    /**
     * @param {mysql.Connection} db 
     * @param {any} dialect 
     */
    constructor(db,dialect){
        this.db = db
        this.dialect = dialect
    }
    close(){
        if(this.db === undefined){
            logger.error("db is undefined")
            return
        }
        this.db.end((err) => {
            if(err){
                logger.error("Close database error:",err)
            }else{
                logger.info("Close database success")
            }
        })
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