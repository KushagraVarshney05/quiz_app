import React from 'react'
import styles from './SignUp.module.css'
import { Link } from 'react-router-dom'

const CARD = () => {
  return (
    <div className={styles.container}>
    <form className={styles.formLogin} 
    // onSubmit={submitHandler} 
    autoComplete="off">
      <h2>Sign In</h2>
      <div>
        <div>
          <input type="text" name="email"  placeholder="E-mail"  autoComplete="off" />
        </div>
      </div>
      <div>
        <div>
          <input type="password" name="password"  placeholder="Password"  autoComplete="off" />
        </div>
      </div>

      <div>
        <button type="submit">Login</button>
        <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
          Don't have a account? <Link to="/signup">Create account</Link>
        </span>
      </div>
    </form>
  </div>
  )
}

export default CARD