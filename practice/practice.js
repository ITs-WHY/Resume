function load(x) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        }, x*1000);
    })
}
load(5)
.then(()=>{
    console.log("It has been 5 seconds")
})