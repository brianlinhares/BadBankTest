
function Home(){
  return (<>
      <Card
        txtcolor="black"
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text="You can move around using the navigation bar."
        body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
      />
   
      <form action="#/login/">
        <input className="btn btn-light" type="submit" value="Login" />
      </form>
      <form action="#/CreateAccount/">
        <input className="btn btn-light" type="submit" value="Create Account" />
      </form>
    </>
  );  
}