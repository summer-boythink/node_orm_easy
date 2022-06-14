const orm = require("../index")
let assert = require("assert")
let {configure} = require("./mysql_test_data/config")

describe("Some basic methods for tables",() => {
    let q = orm.createConnection("mysql",configure)
    it("test createTable",async () => {
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean
        }
        let res = await q.newSession().Model("user1",testObj).createTable()
        assert.equal(res.serverStatus,2)
    })

    it("test DropTable",async () => {
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean
        }
        let res = await q.newSession().Model("user1",testObj).dropTable()
        assert.equal(res.serverStatus,2)
    })
})