import axios from 'axios';

const server_url = process.env.REACT_APP_SERVER_URL

export default axios.create({
    baseURL: server_url,
});

//process.env.REACT_APP_SERVER_URL