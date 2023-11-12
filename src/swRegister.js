import axios from './api/axios'

export default async function registerSW () {

    let swUrl = `${process.env.REACT_APP_CLIENT_URL}/serviceworker.js`;

    const register = await navigator.serviceWorker.register(swUrl).then(res => {
        console.warn("SW registered ..", res)
    }).catch(e => {
        console.error("ERROR :SW not registered ..", e)
    })

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_PUBLIC_VAPI_KEY,
    });

    console.log("push registered... ",subscription);
    console.log('--------------------');

    // send push notification
    console.log(' sending push notification...')
    await axios.post('/endpoints/subscribe-to-push-notification',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
    console.log(' push sent ...')
}

