function getParams(param){
    const search = location.search.substr(1)
    const reg= new RegExp(`/(^|&)${param}=([^&]*)($|&)/`,'i')
    const res = search.match(reg)
    if(res == null){
        return null
    }
    return res[2]
}
function query(name){
    const search = location.search
    const p = new URLSearchParams(search)
    return p.get(name)
}
function queryToObj(){
    const p = new URLSearchParams(location.search)
    const res = {}
    p.forEach((v,k)=>{
        res[k] = v
    })
    return res
}
function queryToObj2(){
    const search = location.search.substr(1)
    let res = {}
    search.split('&').forEach(item=>{
        let r = item.split('=')
        res[r[0]] = r[1]
    })
    return res
}
//flatern
function flatern(arr){
    const isDeep = arr.some(item=>{
        item instanceof Array
    })
    if(!isDeep){
        return arr
    }
    const res = Array.prototype.concat.apply([],arr)
    return flatern(res)
}