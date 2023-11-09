import axios from 'axios';

const socket_url = process.env.REACT_APP_SOCKET_URL

export default axios.create({
    baseURL: socket_url,
});
