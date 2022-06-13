let dialectMap = new Map()

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
exports.RegisterDialect = function(name,dialect){
    dialectMap.set(name,dialect)
}