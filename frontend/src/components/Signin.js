import React from 'react'
import {useNavigate} from 'react-router-dom';

function Signin() {
  const navTo = useNavigate();
  return (
    <div>
      <form action="">
      <label htmlFor="">User name</label>
      <input type="text" />
      <label htmlFor="">Password</label>
      <input type="text" />
      <button>Sign in</button>
      <button onClick={()=>navTo('/signup')}>Create account</button>
      <button onClick={()=>navTo('/forgotpassword')}>Forgot password</button>
      </form>
    </div>
  )
}

export default Signin