life cycle of pwa
1-registring
2-self.addEventListener("install" , (e)=>{
e.waitUntil(
caches.add("")
)

})
3-activating(
e.respondWith()=>prevents browser fetch handling and allow to handling response
)



in fetching :always Remember an object:

e.respondWith()=>prevent default request and handle our req

anyway we should use fetch function inside e.respondeWith:
consider 2 situation:
1:if netWork is Conected => fetch(e.req).then( will be run then )
e.respond(fetch(e.req).then(
res=>{
const cloneRes = res.clone();
caches.open().then(cach=>cache.put(e.req , cloneRes))
return res;
}
))


2: if network is disconnected => fetch().catch( will be run catch) and in this part we should get data from the cache storage{

e.respondWith(
fetch(e.req).then().catch(
err=>caches.match(e.req).then(res=>res)
)

)

}
