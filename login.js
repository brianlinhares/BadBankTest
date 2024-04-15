function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const ctx = React.useContext(UserContext);
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');


  function handle(){
    const encodePassword = encodeURIComponent(password);
    fetch(`/account/login/${email}/${encodePassword}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
            ctx[3].setlogIn(true);
            ctx[1].idUser(data);
            window.location.replace('#/balance/');
        } catch(err) {
            props.setStatus(text);
            console.log('err:', text);
        }
    });
  }   

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
};



//------------------------------------------------------------Original
// function Login(){
//   const [show, setShow]     = React.useState(true);
//   const [status, setStatus] = React.useState('');    

//   return (
//     <Card
//       bgcolor="secondary"
//       header="Login"
//       status={status}
//       body={show ? 
//         <LoginForm setShow={setShow} setStatus={setStatus}/> :
//         <LoginMsg setShow={setShow} setStatus={setStatus}/>}
//     />
//   ) 
// }

// function LoginMsg(props){
//   return(<>
//     <h5>Success</h5>
//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={() => props.setShow(true)}>
//         Authenticate again
//     </button>
//   </>);
// }

// function LoginForm(props){
//   const [email, setEmail]       = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const ctx = React.useContext(UserContext);  

//   function handle(){
//     const user = ctx.users.find((user) => user.email == email);
//     console.log(user);
//     console.log(email, password);
//     if (!user) {
//       console.log('one')      
//       props.setStatus('fail!')      
//       return;      
//     }
//     if (user.password == password) {
//       console.log('two')            
//       props.setStatus('');
//       props.setShow(false);
//       return;      
//     }
//     console.log('three')          
//     props.setStatus('fail!');        
//   }


//   return (<>

//     Email<br/>
//     <input type="input" 
//       className="form-control" 
//       placeholder="Enter email" 
//       value={email} 
//       onChange={e => setEmail(e.currentTarget.value)}/><br/>

//     Password<br/>
//     <input type="password" 
//       className="form-control" 
//       placeholder="Enter password" 
//       value={password} 
//       onChange={e => setPassword(e.currentTarget.value)}/><br/>

//     <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
//   </>);
// }