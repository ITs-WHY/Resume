function isObject(obj){
    return typeof obj === 'object' && obj !== null
}
function isEqual(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)){
        return obj1 === obj2
    }
    if(obj1 === obj2){
        return true
    }
    // 先比较两个 obj 的 keys 的个数
    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)
    if (obj1Keys.length !== obj2Keys.length){
        return false
    }
    // 再比较以 obj1 为基准依次递归比较
    for (let key in obj1){
        const res = isEqual(obj1[key], obj2[key])
        if (!res){
            return false
        }
    }
    // 全相等
    return true
}