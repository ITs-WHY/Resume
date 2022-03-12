async function fn1(){
    return 100 //相当于 return Promise.resolve(100)
}
const res1 = fn1()
res1.then(data =>{
    console.log('data', data)
})

!(async function(){
    const p1 = Promise.resolve(200)
    const data = await p1 // 相当于 Promise then
    console.log('data', data)
})()

// await 后直接跟值，就把值封装为 Promise.resolve()
!(async function(){
    const data1 = await 400 // 相当于 await Promise.resolve(400)
    console.log('data', data1)
})()

// await 后可以跟 async,因为 async 本质也是一个 Promise
!(async function(){
    const data2 = await fn1() // 相当于 await Promise.resolve(400)
    console.log('data', data2)
})()

!(async function(){
    const data3 = await fn1() // 相当于 await Promise.resolve(400)
    console.log('data', data3)
})()

!(async function(){
    const p4 = Promise.reject('err')
    try{
        const res = await p4
        console.log(res)
    }catch(ex){
        console.log(ex) // 相当于 Promise 的 catch
    }
})()

// 因为 await 相当于 then，所以此处不会执行
!(async function(){
    const p4 = Promise.reject('err')
    const res = await p4
    console.log(res)
})()