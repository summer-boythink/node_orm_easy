const mysql = require("mysql")
const print = require("../print")
const {Parse} = require("../schema/index")
const {tableMap} = require("./table")
const {Clause,ClauseType} = require("../clause/index")

exports.session = class session{
    constructor(db,dialect){
        this.db = db
        this.dialect = dialect
        this.driverName = dialect.DriverName()
        this.sqlStatement = null
        this.refTable = null

    }

    /**
     * get Connection
     * @returns {mysql.Connection}
     */
    DB(){
        return this.db
    }

    /**
     * set sqlStatement
     * @param {mysql.QueryOptions | string} params 
     * @returns {session}
     */
    Raw(params){
        this.sqlStatement = params
        return this
    }

    /**
     * clear sqlStatement
     * @returns {session}
     */
    Clear(){
        this.sqlStatement = null
        return this
    }
    /**
     * exec sqlStatement
     * @returns {Promise}
     */

    async Exec(){
        return await new Promise((resolve,reject) => {
            this.DB().query(this.sqlStatement,(err,result) => {
                resolve(result)
            })
        })
    }

    /**
     * All sqlStatement execution results
     * @return {Array}
     */
    async QueryRows(){
        let res = await this.Exec() 
        this.Clear()
        return res
    }

    /**
     * a sqlStatement execution results
     * @return {Object | Array}
     */
     async QueryRow(){
        let res = await this.Exec()
        this.Clear()
        return Array.isArray(res)? res[0]: res
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

    /**
     * table methods
     * @returns {Promise}
     */

    async createTable(){
        let destsql = tableMap.get(this.driverName).createTable(this.RefTable())
        return await this.Raw(destsql).Exec()
    }

    async dropTable(){
        let destsql = tableMap.get(this.driverName).dropTable(this.RefTable())
        return await this.Raw(destsql).Exec()
    }

    async tableExist(){
        let destsql = tableMap.get(this.driverName).tableExist(this.RefTable())
        return await this.Raw(destsql).Exec()
    }

    /**
     * record methods
     * @param {Object}
     * @return {Promise}
     */

    async Insert(values){
        Clause.SetClause(ClauseType.INSERT,values,this.driverName,this.RefTable())
        let destsql = Clause.Build(ClauseType.INSERT)
        return await this.Raw(destsql).Exec()
    }

    /**
     * 
     * @param {string[]} desc 
     * @return {session}
     */
    where(desc){
        
    }

}