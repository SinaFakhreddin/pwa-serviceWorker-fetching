// console.log("sw registered")


const cacheName = "v1"


// const cacheAssetes = [
//     "/",
//     "/contact.html",
//     "/about.html",
//     "/shopping.html",
//     "/js/main.js",
//     "/style/style.css"
// ]

self.addEventListener("install" , (e)=>{
    console.log("sw is : installing")

    e.waitUntil(
        caches.open(cacheName).then().then(self.skipWaiting())
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
//reading data only from netWork
//     e.respondWith(
//         fetch(e.request).then(res=>res)
//     )

    //reading data only from cachStorage
    // e.respondWith(
    //     caches.match(e.request).then(res=>res).catch(err=>console.log(err))
    // )

// reading data ,first from network if wasnt available then from caches
    console.log(e.request)
 e.respondWith(
     fetch(e.request).then(
         res=> {
            const cloneRes = res.clone()
             caches.open(cacheName).then(cach=>cach.put(e.request , cloneRes))
             return res
         }
     ).catch(
         err=>caches.match(e.request).then(res=>res)
     )
 )

//if url contains this address , at the first , raeding data will be from network other wise reading data will be from cacheStorage
    const url = ["https://img.pokemondb.net/artwork/large/bulbasaur.jpg"]
    if (url.includes(e.request.url)){
        console.log("includes")
       return  e.respondWith(
            fetch(e.request).then(
                res =>{
                    console.log("includes and req fetch")
                    caches.open(cacheName).then(cache=>cache.put(e.request , res.clone()))
                    return res
                }
            ).catch(
                caches.match(e.request).then(res=>res).catch(err=>console.log("error matching",err))
            )
        )
    } else
    {
        return  e.respondWith(
            caches.match(e.request).then(res=>res).catch(err=>{

                return fetch(e.request).then(res=>{
                    caches.open(cacheName).then(cach=>cach.put(e.request , res.clone()))
                    return res
                })

            })
        )
    }

})