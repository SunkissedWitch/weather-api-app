import { Navigate } from "react-router-dom";
import jwt from 'jsonwebtoken';

const IsAuthorized = ({ children }) => {
  const secretKey = process.env.REACT_APP_MY_SECRET_KEY;
  const token = localStorage.getItem('MyTemporaryToken');
  
  try { 
    const user = jwt.verify(token, secretKey)
    if (user) {
      return children;
    }
  }
  catch (error) {
    console.log (error);
    return <Navigate to='/' replace />;
  }
}

export default IsAuthorized
