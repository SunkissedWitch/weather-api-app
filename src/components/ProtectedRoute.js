import React from 'react'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  return (
    <>
      <p>Protected</p>
      <Button 
        onClick={() => navigate('/')}
      >
        Go Home
      </Button>
    </>
  )
}
export default ProtectedRoute