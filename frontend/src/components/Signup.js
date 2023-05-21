import React from 'react'
import {useNavigate} from 'react-router-dom';

function Signup() {
  const navTo = useNavigate();

  return (
    <div>
      <form action="">
      <label htmlFor="">Name</label>
      <input type="text" />
      <label htmlFor="">User name</label>
      <input type="text" />
      <label htmlFor="">Password</label>
      <input type="text" />
      <button>Sign up</button>
      <button onClick={()=>navTo('/signin')}>Already have account?</button>
      <button onClick={()=>navTo('/forgotpassword')}>Forgot password</button>
      </form>
    </div>
  )
}

export default Signup;