const orm = require("../index")
let assert = require("assert")
let {configure} = require("./mysql_test_data/config")

describe("### Some basic methods for records ###",async () => {
    
    it("test insert",async() => {
        let e = await orm.createConnection("mysql",configure)
        let s = e.newSession()
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean,
            id:Number
        }
        let tableName = "user2"
        await s.Model(tableName,testObj).createTable()
        let res = await s.Insert({user:"qwe",Age:1,sex:true,id:66})
        assert.equal(res.affectedRows,1)
        e.close()
    })

    it("test select",async() => {
        let e = await orm.createConnection(orm.MYSQL,configure)
        let s = e.newSession()
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean,
            id:Number
        }
        let tableName = "user2"
        s.Model(tableName,testObj)
        let res = await s.where("sex = 1").limit(5).offest(2).select(["user","Age"])
        assert.ok(Array.isArray(res))
        e.close()
    })

    it("test update",async() => {
        let e = await orm.createConnection(orm.MYSQL,configure)
        let s = e.newSession()
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean,
            id:Number
        }
        let tableName = "user2"
        s.Model(tableName,testObj)
        let res = await s.where("id = 2").update({user:"e2",Age:123})
        assert.equal(res.affectedRows,1)
        e.close()
    })

    it("test delete",async() => {
        let e = await orm.createConnection(orm.MYSQL,configure)
        let s = e.newSession()
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean,
            id:Number
        }
        let tableName = "user2"
        s.Model(tableName,testObj)
        let res = await s.where("id = 66").delete()
        assert.equal(res.affectedRows,1)
        e.close()
    })
})