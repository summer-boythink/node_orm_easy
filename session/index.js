const mysql = require("mysql")

exports.session = class session{
    constructor(db,dialect){
        this.db = db
        this.dialect = dialect
        this.sqlParams = null
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
        this.sqlParams = params
        return this
    }

    /**
     * @returns {session}
     */
    Clear(){
        this.sqlParams = null
        return this
    }

    /**
     * @return {Array}
     */
    async QueryRows(){
        let res =  await new Promise((resolve,rej) => {
            this.DB().query(this.sqlParams,(err,result) => {
                resolve(result)
            })
        })
       this.Clear()
       return res
    }

    /**
     * @return {Object}
     */
     async QueryRow(){
        let res =  await new Promise((resolve,rej) => {
            this.DB().query(this.sqlParams,(err,result) => {
                resolve(result[0])
            })
        })
       this.Clear()
       return res
    }
}