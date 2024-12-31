import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useApiPost } from '../helpers/useApiPost';

export const context = createContext();


export const Context = ({ children }) => {
    const token = localStorage.getItem('token');
  const [user, setuser] = useState(undefined)
  const { sesion, setsesion, sesionShow} = useApiPost()

  useEffect(() => {
    if(token) sesionShow(token)
}, [])


  return (
    <context.Provider value={{ user, sesion }}>
      {children}
    </context.Provider>
  );
};
