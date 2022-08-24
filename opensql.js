const mysql = require('mysql')

const supportDriver = new Map()
exports.supportDriver = supportDriver

supportDriver.set('MYSQL',getMySQLConnection)
supportDriver.set('SQLITE3',getSQLITE3Connection)
/**
 * return a MySQLConnection
 * @param {object} config
 * @returns {Promise}
 */
function getMySQLConnection(config){
    //TODO Should I return promise?
    return new Promise((reslove,reject) => {
        let connection = mysql.createConnection(config)
        connection.connect(() => {
            reslove(connection)
        })
    })
}

/**
 * 
 * @param {} driver 
 * @param {*} config 
 * @returns 
 */

function getSQLITE3Connection(config){
    return new Promise((resolve,reject) => {
        // let connection = 
    })
}

/**
 * @param {string} driver
 * @param {mysql.ConnectionConfig} config
 * @returns {null | Connection}
 */
exports.getConnection = function(driver,config){
    let res
    supportDriver.forEach((fn,k) => {
        if(k === driver){
            res = fn(config)
        }
    })
    return res
}
