console.warn("service worker in public")

 this.addEventListener('push', e => {
    const data = e.data.json()
    console.log('Push recieved ..');

    this.registration.showNotification(data.title, {
        body: data.body
    })
})