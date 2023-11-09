import { useEffect, useState} from 'react'
import { Outlet } from "react-router-dom"
import useRefrechToken from "../hooks/useRefrechToken"
import useAuth from "../hooks/useAuth"


const PersitLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refrech = useRefrechToken();
    const { auth } = useAuth();
    
    useEffect(() => {
        let isMounted = true;

        const verifyRefrechToken = async () => {
            try {
                await refrech();
            }catch (err) {
                console.error(err)
            }finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefrechToken() : setIsLoading(false);
        return () => isMounted = false;
    },[]);

    useEffect(() => {
        
    },[isLoading])
    return(
        <>
            {
                isLoading ? <></> : <Outlet />
            }
        </>
    )
 
}

export default PersitLogin