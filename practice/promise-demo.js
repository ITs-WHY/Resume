const p1 = new Promise((resolve, reject) => {

})
const p2 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve()
    })
})
console.log(p1)
console.log(p2)