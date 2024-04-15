function NavBar({}){
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(!ctx[2].logIn);
  
  //sets logged in on load and anytime it changes
  React.useEffect(() => {
    if (ctx[2].logIn) {
      setShow(false);
    } else {
      setShow(true);
    }
  },[ctx[2].logIn]);

  //function to log user out
  function logout () {
    ctx[3].setlogIn(false);
    ctx[1].idUser('');
    ctx[5].balanceUser(0);
  }
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">BadBank</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#/balance/">Balance</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/deposit/">Deposit</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/withdraw/">Withdraw</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/CreateAccount/">Create Account</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/alldata/">AllData</a>
        </li>      
        { show ? <li className="nav-item">
          <a className="nav-link" href="#/login/">Login</a>
        </li> : <li className="nav-item">
          <a className="nav-link" href="#/login/" onClick={logout}>Logout</a>
        </li>}        
      </ul>
    </div>
  </nav>

);
}