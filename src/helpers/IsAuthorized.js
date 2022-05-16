import { Navigate } from "react-router-dom";
import jwt from 'jsonwebtoken';

// import 'dotenv/config';

const IsAuthorized = ({ children }) => {
  // const secretKey = process.env.MY_SECRET_KEY
  // console.log('secretKey', secretKey)
  const token = localStorage.getItem('MyTemporaryToken');
  // try { 
  //   jwt.verify(token, )
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
