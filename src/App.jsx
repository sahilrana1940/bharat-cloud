import { useEffect } from "react";
// ...
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(r => r.forEach(reg => reg.unregister()));
    caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
  }
}, []);