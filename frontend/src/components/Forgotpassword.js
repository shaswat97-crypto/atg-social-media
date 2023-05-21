import React from 'react'
import {useNavigate} from 'react-router-dom';

function Forgotpassword() {
  const navTo = useNavigate();

  return (
    <div>
      <form action="">
      <label htmlFor="">Enter token</label>
      <input type="text" />
      <label htmlFor="">New password</label>
      <input type="text" />
      <button>Resest password</button>
      <button onClick={()=>navTo('/signin')}>Sign in</button>
      </form>
    </div>
  )
}

export default Forgotpassword