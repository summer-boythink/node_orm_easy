const {ClauseType} = require("./index.js")
const print = require("../print")
const {getDialect} = require("../dialect/index")

let mysqlGenerator = new Map()

/**parse js value to sql value**/
let translate = getDialect("MYSQL").translate

/**
 * INSERT INTO table_name ( field1, field2,...fieldN )
    VALUES
    ( value1, value2,...valueN );
 * @param {schema} refTable
 * @param {Object} values
 * @return {string}
 */
function _insert(refTable,values){
    let destSql = `insert into ${refTable.tableName} (`
    for(let k in values){
        if(refTable.fieldName.indexOf(k) === -1){
            print.error(`insert key ${k} not exist in mysql`)
            return
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

/**
 * SELECT column_name,column_name FROM table_name
 * @param {schema} refTable 
 * @param {Object} values
 * @return {string}
 */
function _select(refTable,values){
    let destSql = `select `
    for(let v of values){
        if(refTable.fieldName.indexOf(v) === -1 && v !== "*"){
            print.error(`select key ${v} not exist in mysql`)
            return
        }
        destSql += `${v},`
    }
    destSql = destSql.slice(0,destSql.length - 1)
    destSql += ` from ${refTable.tableName} `
    return destSql
}

/**
 * UPDATE table_name SET field1=new-value1, field2=new-value2
 * @param {schema} refTable 
 * @param {Object} newFieldObj 
 * @return {string}
 */
function _update(refTable,newFieldObj){
    let destSql = `update ${refTable.tableName} set `
    for(let k in newFieldObj){
        if(refTable.fieldName.indexOf(k) === -1){
            print.error(`insert key ${k} not exist in mysql`)
            return
        }
        destSql += `${k} = '${translate(newFieldObj[k])}',`
    }
    destSql = destSql.slice(0,destSql.length - 1)+" "
    return destSql
}

/**
 * 
 * @param {schema} refTable 
 * @return {string}
 */
function _delete(refTable){
    let destSql = `DELETE FROM ${refTable.tableName} `
    return destSql
}

/**
 * [WHERE condition1 [AND [OR]] condition2.....
 * @param {schema} _ 
 * @param {Object} values
 */
function _where(_,values){
    let destSql = `where ${values} `
    return destSql
}

/**
 * limit [Number],[Number]
 * @param {schema} _
 * @param {Number[]} nums
 */
function _limit(_,...nums){
    let destSql = `limit `
    nums.forEach(v => {
        destSql += v+","
    })
    destSql = destSql.slice(0,destSql.length - 1)+" "
    return destSql
}

/**
 * offset [Number]
 * @param {schema} _
 * @param {Number} start
 */
function _offest(_,start){
    let destSql = `offset ${start} `
    return destSql
}


mysqlGenerator.set(ClauseType.INSERT,_insert)
mysqlGenerator.set(ClauseType.SELECT,_select)
mysqlGenerator.set(ClauseType.WHERE,_where)
mysqlGenerator.set(ClauseType.LIMIT,_limit)
mysqlGenerator.set(ClauseType.OFFSET,_offest)
mysqlGenerator.set(ClauseType.UPDATE,_update)
mysqlGenerator.set(ClauseType.DELETE,_delete)

module.exports = mysqlGenerator