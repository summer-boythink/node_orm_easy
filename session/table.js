class MysqlTable {
    createTable(refTable){
        let table = refTable
        let destsql = `create table if not exists ${table.tableName}(\n`
        table.fields.forEach(v => {
            destsql += `${v.name} ${v.type},`
        })
        destsql = destsql.slice(0,destsql.length-1)
        destsql += ') CHARSET=utf8;'
        return destsql
    }
    dropTable(refTable){
        let table = refTable
        let destsql = `drop table if exists ${table.tableName};`
        return destsql
    }
    tableExist(refTable){
        let table = refTable
        let destsql = `SELECT table_name FROM information_schema.TABLES WHERE table_name ='${table.tableName}';`
        return destsql
    }
}

let mysql_table = new MysqlTable()
let tableMap = new Map()

tableMap.set("MYSQL",mysql_table)

exports.tableMap = tableMap