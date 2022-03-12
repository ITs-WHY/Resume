// 手写 Promise
function loadImg(src){
    return new Promise(
        (resolve, reject) => {
            let img = document.createElement('img')
            img.onload = () => {
                resolve(img)
            }
            img.onerror = () => {
                reject(new Error('error'))
            }
            img.src = src
        }
    )
}

let URL1 = 'https://edu-image.nosdn.127.net/3310f128e53b406f94400f7ae6046db2.png?imageView&quality=100'
let URL2= 'https://s3.pstatp.com/toutiao/xitu_juejin_web/img/logo.a7995ad.svg'

!(async function(){
    const img1 = await loadImg(URL1)
    console.log(img1.height)

    const img2 = await loadImg(URL2)
    console.log(img2.height)
})()