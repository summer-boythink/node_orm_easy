const mysql = require("mysql")
const print = require("../print")
const {Parse} = require("../schema/index")
const {tableMap} = require("./table")
const {Clause,ClauseType} = require("../clause/index")
const {hooks,hooksMethod} = require("./hooks")
const record = require("./record")

exports.session = class session{
    constructor(db,dialect){
        this.db = db
        this.dialect = dialect
        this.driverName = dialect.DriverName()
        this.sqlStatement = null
        this.refTable = null
        this.hook = hooks
        this.hookMethod = hooksMethod
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
        let hookValues = this.hook.callHook(this.hookMethod.BeforeInsert,values)
        if(hookValues != undefined){
            values = hookValues
        }
        Clause.SetClause(ClauseType.INSERT,values,this.driverName,this.RefTable())
        let destsql = Clause.Build(...(record.get(this.driverName).INSERT))
        let res = await this.Raw(destsql).Exec()
        this.hook.callHook(this.hookMethod.AfterInsert)
        return res
    }

    /**
     * @param {string[]} selectName
     * @return {Promise}
     */
    async select(selectName){
        this.hook.callHook(this.hookMethod.BeforeSelect)
        Clause.SetClause(ClauseType.SELECT,selectName,this.driverName,this.RefTable())
        let destSql = Clause.Build(...(record.get(this.driverName).SELECT))
        let res = await this.Raw(destSql).Exec()
        let ret = this.hook.callHook(this.hookMethod.AfterSelect,res)
        if(ret != undefined){
            return ret
        }
        return res
    }

    /**
     * 
     * @param {Object} newFieldObj 
     * @return {Promise}
     */
    async update(newFieldObj){
        let hookObj = this.hook.callHook(this.hookMethod.BeforeUpdate,newFieldObj)
        if(hookObj != undefined){
            newFieldObj = hookObj
        }
        Clause.SetClause(ClauseType.UPDATE,newFieldObj,this.driverName,this.RefTable())
        let destSql = Clause.Build(...(record.get(this.driverName).UPDATE))
        let res = await this.Raw(destSql).Exec()
        this.hook.callHook(this.hookMethod.AfterUpdate)
        return res
    }

    async delete(){
        this.hook.callHook(this.hookMethod.BeforeDelete)
        Clause.SetClause(ClauseType.DELETE,null,this.driverName,this.RefTable())
        let destSql = Clause.Build(...(record.get(this.driverName).DELETE))
        let res = await this.Raw(destSql).Exec()
        this.hook.callHook(this.hookMethod.AfterDelete)
        return res
    }
    
    /**
     * 
     * @param {string} desc
     * @return {session}
     */
     where(desc){
        Clause.SetClause(ClauseType.WHERE,desc,this.driverName,this.RefTable())
        return this
    }

    /**
     * 
     * @param {Number[]} nums
     * @return {session}
     */
    limit(...nums){
        Clause.SetClause(ClauseType.LIMIT,nums,this.driverName,this.RefTable())
        return this
    }
    
    /**
     * @param {Number} start
     * @return {session}
     */
    offest(start){
        Clause.SetClause(ClauseType.OFFSET,start,this.driverName,this.RefTable())
        return this
    }
}