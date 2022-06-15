const mysql = require('mysql')

const supportDriver = new Map()
exports.supportDriver = supportDriver

supportDriver.set('MYSQL',getMySQLConnection)

/**
 * return a MySQLConnection
 * @param {object} config
 * @returns {Promise}
 */
function getMySQLConnection(config){
    return new Promise((reslove,reject) => {
        let connection = mysql.createConnection(config)
        connection.connect(() => {
            reslove(connection)
        })
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
