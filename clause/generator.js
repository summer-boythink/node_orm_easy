const mysqlGenerator = require("./mysql_generator")

let generator = new Map()

generator.set("MYSQL",mysqlGenerator)

module.exports = generator