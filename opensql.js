const mysql = require('mysql')

const supportDriver = new Map()
exports.supportDriver = supportDriver

supportDriver.set('MYSQL',getMySQLConnection)

/**
 * @param {object} config
 * @returns {mysql.Connection}
 */
function getMySQLConnection(config){
    let connection = mysql.createConnection(config)
    return connection
}

/**
 * @param {string} driver
 * @param {mysql.ConnectionConfig} config
 * @returns {null | Connection}
 */
exports.getConnection = function(driver,config){
    let res
    supportDriver.forEach((fn,k) => {
        if(k.toLowerCase() === driver){
            res = fn(config)
        }
    })
    return res
}
