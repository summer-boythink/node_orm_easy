exports.ClauseType = {
    INSERT : 1,
    VALUES : 2,
    SELECT : 3,
    LIMIT : 4,
    WHERE : 5,
    ORDERBY : 6,
    UPDATE : 7,
    DELETE : 8,
    COUNT : 9,
    OFFSET : 10
}

const generator = require("./generator")

class Clause {
    constructor(){
        this.sql = new Map()
    }
    
    /**
     * set sql clause
     * @param {Number} type
     * @param {any} args
     * @param {string} driverName
     * @param {schema} refTable
     */
    SetClause(type,args,driverName,refTable){
        let sql = generator.get(driverName).get(type)(refTable,args)
        this.sql.set(type,sql)
    }

    /**
     * return a complete sql statement
     * @param  {...Number} types
     * @return {string} 
     */
    Build(...types){
        let sql = ""
        types.forEach(v => {
            if(this.sql.get(v) !== undefined){
                sql += this.sql.get(v)
            }
        })
        return sql
    }
}

exports.Clause = new Clause()
