import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function Forgotpassword() {
  const navTo = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    let username = formData.get('username');
    let password = formData.get('password');

    let obj = {username, password};
    let res = await axios.post('/api/v1/forgotpassword', obj)
    e.target.reset();
    if(res.status == 200){
      navTo('/home')
    }
  }
  return (
    <div className='signin'>
      <h1>Forgot password</h1>
      <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">Enter username</label>
      <input name='username' id='name' type="text" />
      <label htmlFor="">Enter new password</label>
      <input name='password' id='password' type="text" />
      <button style={{marginRight:'0', marginBottom:'10px'}} className='button-18'>Resest password</button>
      <button style={{marginRight:'0', marginBottom:'10px'}} className='button-18' onClick={()=>navTo('/')}>Sign in</button>
      </form>
    </div>
  )
}

export default Forgotpassword