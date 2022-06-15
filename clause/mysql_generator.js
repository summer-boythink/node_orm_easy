const {ClauseType} = require("./index.js")
const print = require("../print")
const {getDialect} = require("../dialect/index")

let mysqlGenerator = new Map()

/**parse js value to sql value**/
let translate = getDialect("MYSQL").translate

/**
 * @param {schema} refTable
 * @param {Object} values
 */
function _insert(refTable,values){
    let destSql = `insert into ${refTable.tableName} (`
    for(let k in values){
        if(refTable.fieldName.indexOf(k) === -1){
            print.error(`insert key ${k} not exist in mysql`)
            continue;
        }
        destSql += `${k},`
    }
    destSql = destSql.slice(0,destSql.length - 1)
    destSql += ") values ("
    for(let k in values){
        destSql += `'${translate(values[k])}',`
    }
    destSql = destSql.slice(0,destSql.length - 1)
    destSql += ');'
    return destSql
}


mysqlGenerator.set(ClauseType.INSERT,_insert)


module.exports = mysqlGenerator