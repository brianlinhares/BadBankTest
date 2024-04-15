// function Spa() {
//   return (
//     <HashRouter>
//       <div>
//         <NavBar/>        
//         <UserContext.Provider value={{users:[{name:'brian',email:'brian@mit.edu',password:'secret',balance:100}]}}>
//           <div className="container" style={{padding: "20px"}}>
//             <Route path="/" exact component={Home} />
//             <Route path="/CreateAccount/" component={CreateAccount} />
//             <Route path="/login/" component={Login} />
//             <Route path="/deposit/" component={Deposit} />
//             <Route path="/withdraw/" component={Withdraw} />
//             {/* <Route path="/transactions/" component={Transactions} /> */}
//             <Route path="/alldata/" component={AllData} />
//           </div>
//         </UserContext.Provider>
//       </div>
//     </HashRouter>
//   );
// }

// ReactDOM.render(
//   <Spa/>,
//   document.getElementById('root')
// );

function Spa() {
  const [user, setUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);

  //sets logged in when user logs in
function setlogIn (log) {
  setLoggedIn(log);
}

//sets user when user logs in
function idUser (data) {
  setUser({...user,
    id: data._id,
    name: data.name,
    email: data.email,
    password: data.password,
    balance: data.balance,
  });
}

//set user balance when logged in or when balance changes
function balanceUser (balance) {
  setUser({...user, balance: balance});
}

return (
    <HashRouter>
      <div>
      <UserContext.Provider value={[{user: user}, {idUser: idUser}, {logIn: loggedIn}, {setlogIn: setlogIn}, {userBal: userBal}, {balanceUser: balanceUser}]}>
        <NavBar />        
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);