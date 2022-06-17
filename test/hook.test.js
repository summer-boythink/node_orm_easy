const orm = require("../index")
let assert = require("assert")
let {configure} = require("./mysql_test_data/config")

describe("### test some hooks ###",async () => {
    it("test hook",async() => {
        let e = await orm.createConnection(orm.MYSQL,configure)
        let s = e.newSession()
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean,
            id:Number
        }
        let tableName = "user2"
        await s.Model(tableName,testObj).createTable()
        s.hook.setHook(s.hookMethod.BeforeSelect,() => {
            console.log("begin select...")          
        })
        s.hook.setHook(s.hookMethod.AfterSelect,v => {
            console.log("select after hook")
            v.forEach(val => {
                val.sex = "xxx"
            })
            return v
        })
        s.hook.setHook(s.hookMethod.BeforeInsert,v => {
            v.Age += 100
            return v
        })
        let res1 = await s.where("id>2").limit(3).select(["user","sex"])
        console.log(res1);
        assert.equal(res1[1].sex,"xxx")
        let res2 = await s.Insert({user:"22",Age:12})
        console.log(res2);
        e.close()
    })
})