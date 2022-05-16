import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';


const SignInButton = () => {
  const [ state, setState ] = useState(localStorage.getItem('MyTemporaryToken'));

  const navigate = useNavigate();

  const signIn = () => navigate('/login');
  const signOut = () => {
    localStorage.removeItem('MyTemporaryToken');
    setState(false)
  }


  return (
    <Button 
        ghost
        shape='round'
        size='large'
        style={{marginLeft: '20px', marginRight: '20px'}}
        onClick={state ? signOut : signIn}
      >
        {state ? 'Sign Out' : 'Sign in'}
      </Button>
  )
}

export default SignInButton;
