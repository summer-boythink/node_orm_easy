const orm = require("../index")
let assert = require("assert")
let {configure} = require("./mysql_test_data/config")

describe("testing session",() => {
    let q = orm.createConnection("mysql",configure)
    it("test queryRows",async () => {
        let res = await q.newSession().Raw({
            sql:"select * from users where pass='123'"
        }).QueryRows()
        assert.equal(res[1].user,"1w")
    })

    it("test queryRow",async () => {
        let res =await q.newSession().Raw("select * from users where pass='123'").QueryRow()
        assert.equal(res.user,"tang")
        assert.equal(res.pass,"123")
    })
})