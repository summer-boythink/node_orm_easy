const orm = require("../index")
let assert = require("assert")
const {supportDriver} = require("../opensql.js")
const logger = require("pino")
describe("testConnection",() => {
    describe("CreateConnection",() => {
        it("should return fail connection",() => {
            let q = orm.createConnection("2qeqwsa",{
                host     : 'localhost',
                port     :  9588,
                user     : 'root',
                password : '123456',
                database : 'test'
            })
            assert.equal(q.db,undefined)
            q.close()
        })

        it("should return right connection",() => {
            let q = orm.createConnection("mysql",{
                host     : 'localhost',
                port     :  9588,
                user     : 'root',
                password : '123456',
                database : 'test'
            })
            assert.ok(supportDriver.has("MYSQL"))
            q.close()
        })
    })
})

