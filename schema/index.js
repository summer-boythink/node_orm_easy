
class Field {
    /**
     * 
     * @param {string} name 
     * @param {string} type 
     */
    constructor(name,type){
        this.name = name
        this.type = type
        // TODO prepare for primary key
        this.tag = null
    }
}


class Schema {
    /**
     * 
     * @param {string} tableName 
     * @param {Object} model 
     */
    constructor(tableName,model){
        this.model = model
        this.tableName = tableName
        this.fieldMap = new Map()
        this.fields = []
        this.fieldName = []        
    }

    getField(name){
        return this.fieldMap[name]
    }
}

/**
 * parse object to schema
 * @param {string} tableName 
 * @param {Schema} targetObject 
 */
exports.Parse = function(tableName,targetObject,dialect){
    let schema = new Schema(tableName,targetObject)
    for(let key in targetObject){
        let type = targetObject[key].name
        type = dialect.DataTypeOf(type)
        let field = new Field(key,type)
        // TODO primary key how to check
        schema.fields.push(field)
        schema.fieldName.push(key)
        schema.fieldMap.set(key,field)
    }
    return schema
}