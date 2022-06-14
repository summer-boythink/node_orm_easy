const mysql = require("mysql")
const print = require("../print")
const {Parse} = require("../schema/index")

exports.session = class session{
    constructor(db,dialect){
        this.db = db
        this.dialect = dialect
        this.sqlStatement = null
        this.refTable = null
    }

    /**
     * @returns {mysql.Connection}
     */
    DB(){
        return this.db
    }

    /**
     * @param {mysql.QueryOptions | string} params 
     * @returns {session}
     */
    Raw(params){
        this.sqlStatement = params
        return this
    }

    /**
     * @returns {session}
     */
    Clear(){
        this.sqlStatement = null
        return this
    }

    async Exec(){
        return await new Promise((resolve,reject) => {
            this.DB().query(this.sqlStatement,(err,result) => {
                resolve(result)
            })
        })
    }

    /**
     * @return {Array}
     */
    async QueryRows(){
        let res = await this.Exec() 
        this.Clear()
        return res
    }

    /**
     * @return {Object}
     */
     async QueryRow(){
        let res = await this.Exec()
        this.Clear()
        return res[0]
    }

    /**
     * map sql to object
     * @param {string} tableName
     * @param {Object} target 
     * @returns {session}
     */
    Model(tableName,target){
        for(let key in target){
            if(typeof target[key] !== "function") {
                print.error("target for each item must is a primitive function")
            }
        }
        this.refTable = Parse(tableName,target,this.dialect)
        return this
    }

    RefTable(){
        if(this.refTable === null){
            print.warn("reftable is null")
        }
        return this.refTable
    }

    async createTable(){
        let table = this.RefTable()
        let destsql = `create table if not exists ${table.tableName}(\n`
        table.fields.forEach(v => {
            destsql += `${v.name} ${v.type},`
        })
        destsql = destsql.slice(0,destsql.length-1)
        destsql += ') CHARSET=utf8;'

        return await this.Raw(destsql).Exec()
    }

    async dropTable(){
        let table = this.RefTable()
        let destsql = `drop table if exists ${table.tableName}`
        return await this.Raw(destsql).Exec()
    }

    //TODO check table whether exist
}