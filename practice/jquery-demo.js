class jQuery{
    constructor(selector){
        const result = document.querySelectorAll(selector)
        const length = result.length
        for(let i = 0; i<length; i++){
            this[i] = result[i]
        }
        this.length = length
    }
    // 获取第几个元素
    get(index){
        return this(index)
    }
    // 遍历
    each(fn){
        for (let i = 0; i < this.length; i++){
            const elem = this[i]
            fn(elem)
        }
    }
    // 监听
    on(type, fn) {
        return this.each(elem =>{
            elem.addEventListener(type, fn, false)
        })   
    }
}
// 插件机制
jQuery.prototype.dialog = function (params) {
    alert(params)    
}
// 复写机制
class myjQuery extends jQuery {
    constructor(selector){
        super(selector)
    }
    addClass(classname) {   
    }
}