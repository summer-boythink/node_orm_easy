const Moment = require("moment")

class Mysql {
    /**
     * Parse js types into database types
     * @param {string} type 
     * @returns {string}
     */
    DataTypeOf(type){
        switch (type){
            // TODO: other type how to map
            case "Boolean":
                return "tinyint(1)"
            case "String":
                return "text"
            case "Number":
                return "float"
            case "Buffer":
                return "binary"
            case "Date":
                return "datetime"
            case "Blob":
                return "blob"
        }
    }

    /**
     * translate js value to sql value
     * @param {any} value
     */
    translate(value){
        let v = Object.prototype.toString.call(value)
        v = v.slice(8,v.length - 1)
        switch(v){
            case "Boolean":
                return value?1:0
            case "Date":
                return Moment(value).format('YYYY-MM-DD HH:mm:ss')
            default:
                return value
        }
    }
    /**
     * 
     * @returns {string}
     */
    DriverName(){
        return "MYSQL"
    }
}

let mysql = new Mysql()

exports.mysql = mysql
