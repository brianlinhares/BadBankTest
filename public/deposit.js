
//-----------------------------------------------------------------------Works!
function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const ctx = React.useContext(UserContext);

  return (
    <Card
      bgcolor="warning"
      header={ctx[2].logIn ? `Deposit ${ctx[0].user.email}` : 'Please Log In to make a deposit'}
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
          }}>
        Deposit Again?
    </button>
  </>);
} 

function DepositForm(props){
  const ctx = React.useContext(UserContext);
  const [email, setEmail]   = React.useState(ctx[0].user.email);
  const [amount, setAmount] = React.useState(Number);
  const [balance, setBalance] = React.useState(100);
    
  function handle(){
    console.log(email,balance);
    const url = `/account/deposit/${email}/${amount}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })(); 
    props.setShow(false);
  }    


  return(<>

    Balance<br/>
    {ctx[2].logIn ? `$ ${ctx[0].user.balance}` : '$0'}<br/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}

//-----------------------------------------------------------------------Original
// function Deposit(){
//   const [show, setShow]     = React.useState(true);
//   const [status, setStatus] = React.useState('');  

//   return (
//     <Card
//       bgcolor="warning"
//       header="Deposit"
//       status={status}
//       body={show ? 
//         <DepositForm setShow={setShow} setStatus={setStatus}/> :
//         <DepositMsg setShow={setShow}/>}
//     />
//   )
// }

// function DepositMsg(props){
//   return (<>
//     <h5>Success</h5>
//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={() => props.setShow(true)}>
//         Deposit again
//     </button>
//   </>);
// } 

// function DepositForm(props){
//   const [email, setEmail]   = React.useState('');
//   const [amount, setAmount] = React.useState('');
//   const ctx = React.useContext(UserContext);  

//   function handle(){
//     console.log(email,amount);
//     const user = ctx.users.find((user) => user.email == email);
//     if (!user) {
//       props.setStatus('fail!');
//       return;      
//     }

//     user.balance = user.balance + Number(amount);
//     console.log(user);
//     props.setStatus('');      
//     props.setShow(false);
//   }

//   return(<>

//     Email<br/>
//     <input type="input" 
//       className="form-control" 
//       placeholder="Enter email" 
//       value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
//     Amount<br/>
//     <input type="number" 
//       className="form-control" 
//       placeholder="Enter amount" 
//       value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={handle}>Deposit</button>

//   </>);
// }