
if ("serviceWorker" in navigator){
    console.log("sw is supported")

    window.addEventListener("load" , ()=>{
       navigator.serviceWorker.register("./../sw-sites.js")
    })
}


