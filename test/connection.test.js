const orm = require("../index")
let assert = require("assert")
const {supportDriver} = require("../opensql.js")
let {configure} = require("./mysql_test_data/config")

describe("### test Connection ###",() => {
    describe("CreateConnection",() => {
        it("test fail connection",async () => {
            let c = await orm.createConnection("2qeqwsa",configure)
            assert.equal(c.db,undefined)
            assert.ok(!c.close())
            c.close()
        })

        it("test right connection",async () => {
            let c = await orm.createConnection("mysql",configure)
            assert.ok(supportDriver.has("MYSQL"))
            assert.ok(c.close())
            c.close()
        })
    })
})

