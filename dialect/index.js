let dialectMap = new Map()
const {mysql} = require("./mysql")
/**
 * @param {string} name 
 * @return {class}
 */
exports.getDialect = function(name){
    return dialectMap.get(name)
}

/**
 * @param {string} name
 * @param {class} dialect
 */
function RegisterDialect(name,dialect){
    dialectMap.set(name,dialect)
}

RegisterDialect("mysql",mysql)