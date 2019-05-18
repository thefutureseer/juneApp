import React from 'react';

const Landing = () => {
 return (
  <section className="landing">
  <div className="dark-overlay">
    <div className="landing-inner">
      <h1 className="x-large"> Footgolf Fun</h1>
      <p className="lead">
        Create a Footgolfer profile and game portfolio, share posts and get together with other footgolfers
      </p>
      <div className="buttons">
        <a href="register.html" className="btn btn-primary">Sign Up</a>
        <a href="login.html" className="btn btn-light">Login</a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Landing;