import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function Signup() {
  const navTo = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    let name = formData.get('name');
    let username = formData.get('username');
    let password = formData.get('password');

    let obj = {name, username, password};
    let res = await axios.post('/api/v1/signup', obj)
    e.target.reset();
    if(res.status == 201){
      navTo('/home')
    }
  }
  return (
    <div className='signin'>
      <h1>Sign up</h1>
      <form action="" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input name='name' id='name' type="text" />
      <label htmlFor="username">User name</label>
      <input name='username' id='name' type="text" />
      <label htmlFor="password">Password</label>
      <input name='password' id='password' type="text" />
      <button type='submit' style={{marginRight:'0', marginBottom:'10px'}} className='button-18'>Sign up</button>
      <button style={{marginRight:'0', marginBottom:'10px'}} className='button-18' onClick={()=>navTo('/')}>Already have account?</button>
      <button style={{marginRight:'0', marginBottom:'10px'}} className='button-18' onClick={()=>navTo('/forgotpassword')}>Forgot password</button>
      </form>
    </div>
  )
}

export default Signup;