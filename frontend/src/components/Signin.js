import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import './signin.css'

function Signin() {
  const navTo = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    let username = formData.get('username');
    let password = formData.get('password');

    let obj = {username, password};
    let res = await axios.post('/api/v1/signin', obj)
    e.target.reset();
    console.log(res)
    if(res.status == 200){
      navTo('/home');
    }
  }
  return (
    <div className='signin'>
      <h1>Sign in</h1>
      <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">Username</label>
      <input name='username' id='name' type="text" />
      <label htmlFor="">Password</label>
      <input name='password' id='password' type="password" />
      <button style={{marginRight:'0', marginBottom:'10px'}} className='button-18'>Sign in</button>
      <button style={{marginRight:'0', marginBottom:'10px'}} className='button-18' onClick={()=>navTo('/signup')}>Create account</button>
      <button style={{marginRight:'0', marginBottom:'10px'}} className='button-18' onClick={()=>navTo('/forgotpassword')}>Forgot password</button>
      </form>
    </div>
  )
}

export default Signin