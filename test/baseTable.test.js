const orm = require("../index")
let assert = require("assert")
let {configure} = require("./mysql_test_data/config")

describe("### Some basic methods for tables ###",async () => {
    
    it("test createTable",async () => {
        let e = await orm.createConnection("mysql",configure)
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean
        }
        let res = await e.newSession().Model("user1",testObj).createTable()
        assert.equal(res.serverStatus,2)
        e.close()
    })

    it("test ExistTable",async () => {
        let e = await orm.createConnection("mysql",configure)
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean
        }
        let res = await e.newSession().Model("user1",testObj).tableExist()
        assert.ok(res.length > 0)
        e.close()
    })

    it("test DropTable",async () => {
        let e = await orm.createConnection("mysql",configure)
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean
        }
        let res = await e.newSession().Model("user1",testObj).dropTable()
        assert.equal(res.serverStatus,2)
        e.close()
    })
})