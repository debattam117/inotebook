import React from 'react'
import {Link,useLocation} from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';



  
const Navbar = () => {

  let location = useLocation();
  React.useEffect(() => {
    
    console.log(location.pathname);

  }, [location]);
  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">InoteBook</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link></li>
          <li className="nav-item"><Link className={`nav-link ${location.pathname==="/About"?"active":""}`} to="About/">About</Link></li>
          

        <li className="nav-item">
          <a className="nav-link" href="/">Link</a>
        </li>
        
      </ul>
      {!localStorage.getItem('token')?(<form className="d-flex" role="search">
        <Link className="btn btn-primary mx-2"  to="/Login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2"  to="/Signup" role="button">Signup</Link>
      </form>):<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}

    </div>
  </div>
</nav>
      
    </div>
  )
}

export default Navbar
