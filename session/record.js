const {ClauseType} = require("../clause/index")

const MysqlRecord = {
    INSERT:[ClauseType.INSERT],
    UPDATE:[ClauseType.UPDATE,ClauseType.WHERE],
    SELECT:[ClauseType.SELECT,ClauseType.WHERE,ClauseType.LIMIT,ClauseType.OFFSET],
    DELETE:[ClauseType.DELETE,ClauseType.WHERE]
}

const Record = new Map() 
Record.set("MYSQL",MysqlRecord)

module.exports = Record