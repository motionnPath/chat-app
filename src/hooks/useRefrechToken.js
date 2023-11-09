import axios from '../api/axios.js'
import useAuth from './useAuth.js'


function useRefrechToken() {

    const { setAuth } = useAuth();
   
    const refresh = async() => {

   
        const response = await axios.get('/users/login',{
            withCredentials: true
        });
        
        setAuth((prev) => ({
            ...prev,
            accessToken: response.data.accessToken,
            user:response.data.user
        }));
        
        return response.data.accessToken;
    }
  return refresh;
}

export default useRefrechToken