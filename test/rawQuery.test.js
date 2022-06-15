const orm = require("../index")
let assert = require("assert")
let {configure} = require("./mysql_test_data/config")

describe("### testing session ###",async () => {
    
    it("test queryRows",async () => {
        let q = await orm.createConnection("mysql",configure)
        let res = await q.newSession().Raw({
            sql:"select * from users where pass='123'"
        }).QueryRows()
        assert.equal(res[1].user,"1w")
        q.close()
    })

    it("test queryRow",async () => {
        let q = await orm.createConnection("mysql",configure)
        let res =await q.newSession().Raw("select * from users where pass='123'").QueryRow()
        assert.equal(res.user,"tang")
        assert.equal(res.pass,"123")
        q.close()
    })
})