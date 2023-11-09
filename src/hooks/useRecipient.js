import  RecipientContext  from "../context/RecipientProvider"
import  {  useContext } from 'react';

// custom hook for recipient
const useRecipient = () => {

    const { recipient } = useContext(RecipientContext);
  
    if (recipient === null) {
      throw new Error('Error from useRecipient');
    }
    return useContext(RecipientContext);
}

export default useRecipient; 
  