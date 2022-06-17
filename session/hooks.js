const print = require("../print")

const HooksMethod = {
    BeforeSelect  : "BeforeSelect",
	AfterSelect   : "AfterSelect",
	BeforeUpdate : "BeforeUpdate",
	AfterUpdate  : "AfterUpdate",
	BeforeDelete : "BeforeDelete",
	AfterDelete  : "AfterDelete",
	BeforeInsert : "BeforeInsert",
	AfterInsert  : "AfterInsert",
}

class Hooks {
    constructor(){
		this.registerHooks = new Map()
    }

	/**
	 * 
	 * @param {string} method 
	 * @param {} value 
	 */
    callHook(method,value){
		let hookfn = this.registerHooks.get(method)
       	if(hookfn) hookfn(value)
    }
	/**
	 * (If hook involves operating on a object || the CURD result is an array or objects), 
	 * the first argument to fn represents the object
	 * fn 
	 * @param {string} method 
	 * @param {Function} fn
	 */
	setHook(method,fn){
		if (typeof fn !== "function"){
			print.error("hook function is invalid")
			return
		}
		for(let k in HooksMethod){
			if(HooksMethod[k] === method){
				this.registerHooks.set(method,fn)
			}
		}
	}
}

exports.hooks = new Hooks()
exports.hooksMethod = HooksMethod