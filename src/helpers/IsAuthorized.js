import { Navigate } from "react-router-dom";
import jwt from 'jsonwebtoken';

const IsAuthorized = ({ children }) => {
  const secretKey = process.env.REACT_APP_MY_SECRET_KEY
  console.log('secretKey', secretKey)
  
  const token = localStorage.getItem('MyTemporaryToken');
  // try { 
  //   const user = jwt.verify(token, secretKey)
  //   console.log('user', user)
  // }
  // catch (error) {
  //   console.log (error)
  // }

  if (!token) {
    return <Navigate to='/' replace />;
  }
  console.log('token', token)

  return children;
}

export default IsAuthorized
