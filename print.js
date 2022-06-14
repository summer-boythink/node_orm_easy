var styles = {
    'red': '\x1B[31m[node_orm:error]\x1B[0m',
    'green': '\x1B[32m[node_orm:info]\x1B[0m',
    'yellow': '\x1B[33m[node_orm:tip]\x1B[0m',
    'redBG': '\x1B[41mnode_orm:error:\x1B[0m',
    'greenBG': '\x1B[42mnode_orm:info:\x1B[0m',
}

class print {
    constructor(){
        this.values = ""
    }
    clear(){
        this.values = ""
    }
    error(...value){
        this.clear()
        this.values = styles['red']+value
        console.error(this.values)
    }
    info(...value){
        this.clear()
        this.values = styles['green']+value
        console.info(this.values)
    }
    warn(...value){
        this.clear()
        this.values = styles['yellow']+value
        console.warn(this.values)
    }
}

const p = new print()
module.exports = p
