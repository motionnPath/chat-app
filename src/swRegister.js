import axios from './api/axios'

export const registerSW = async () => {

    let swUrl = `/serviceworker.js`;
    console.log("sw registering... ");
    const register = await navigator.serviceWorker.register(swUrl,{
        scope:'/'
    })
    console.log("sw registered... ",register);
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


