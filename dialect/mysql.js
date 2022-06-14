class Mysql {
    /**
     * 
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
                return "int"
            case "Buffer":
                return "binary"
            case "Date":
                return "datetime"
            case "Blob":
                return "blob"
        }
    }
    TableExistSQL(){

    }
}

let mysql = new Mysql()

exports.mysql = mysql
