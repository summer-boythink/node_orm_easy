## a orm of node

## Install
```sh
yarn add node_orm_easy
or
npm install node_orm_easy
```

## DB support
- [x] MYSQL
- [ ] SQLITE3

## Features
- support createTable,dropTable
- support insert ,select ,delete,update,raw query
- support hooks
- async & await usage

## As example
```javascript
    const orm = require("node_orm_easy");

    let configure = {
        host     : 'localhost',
        port     :  3306,
        user     : 'root',
        password : '123456',
        database : 'test'
    }
    //notice ; don't forget
    ;(async () => {
        let e = await orm.createConnection(orm.MYSQL,configure)
        let s = e.newSession()

        //model && table
        let testObj = {
            user:String,
            Age:Number,
            sex:Boolean,
            id:Number
        }
        let tableName = "user2"
        await s.Model(tableName,testObj).createTable()

        //hooks
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

        //select && insert
        let res1 = await s.where("id>2").limit(3).select(["user","sex"])
        let res2 = await s.Insert({user:"22",Age:12})
        console.log(res1);
        console.log(res2);
        e.close()
    })()
```