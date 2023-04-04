// console.log("sw registered")


const cacheName = "V5"


const cacheAssetes = [
    "/",
    "/contact.html",
    "/about.html",
    "/shopping.html",
    "/js/main.js",
    "/style/style.css"
]

self.addEventListener("install" , (e)=>{
    console.log("sw is : installing")

    e.waitUntil(
        caches.open(cacheName).then((cach)=>{
            console.log("cache is opened")
            cach.addAll(cacheAssetes)
            console.log("cach is  add all")
        }).then(self.skipWaiting())
    )

})


//
self.addEventListener("activate" , (e)=>{

    e.waitUntil(
        caches.keys().then((cachNames)=> {
            cachNames.map((cachN)=>{
                    console.log("cachName Maping :",cachN)
                if (cachN!==cacheName){
                   console.log("cachN must be deleted:" , cachN)
                    caches.delete(cachN)
                    console.log("cacheName is deleted")
                }
            })

        })
    )

})




//

self.addEventListener("fetch" , (e)=>{
    console.log("sw is : fetching")
            e.respondWith(
                fetch(e.request).catch(()=>caches.match(e.request))
            )
})