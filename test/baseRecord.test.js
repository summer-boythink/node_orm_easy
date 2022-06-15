const orm = require("../index")
let assert = require("assert")
let {configure} = require("./mysql_test_data/config")

describe("Some basic methods for records",async () => {
    let s = orm.createConnection("mysql",configure).newSession()
    let testObj = {
        user:String,
        Age:Number,
        sex:Boolean
    }
    let tableName = "user2"
    it("test insert",async() => {
        await s.Model(tableName,testObj).createTable()
        let res = await s.Insert({user:"qwe",Age:1,sex:true})
        assert.equal(res.affectedRows,1)
    })
})