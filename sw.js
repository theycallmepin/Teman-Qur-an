// Service worker Teman Qur'an: baca offline setelah halaman pernah dibuka
const C='tq-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||/\.(mp3|m4a|ogg)(\?|$)/i.test(r.url)||r.headers.has('range'))return;
  e.respondWith(
    fetch(r).then(res=>{
      if(res&&(res.status===200||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}
      return res;
    }).catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('./'):Response.error())))
  );
});
