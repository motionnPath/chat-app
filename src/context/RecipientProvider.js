import React, { createContext, useEffect, useState } from 'react';

const RecipientContext = createContext({});


export const RecipientProvider = ({ children }) => {

  const [recipient, setRecipient] = useState(localStorage.getItem("recipient")?.split(',') || []); 

  useEffect(() => {

    localStorage.setItem("recipient", recipient);
    
  },[recipient])

  return (
    <RecipientContext.Provider value={{ recipient, setRecipient }}>
      {children}
    </RecipientContext.Provider>
    
  );
};

export default RecipientContext;