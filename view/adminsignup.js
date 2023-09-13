
const signupform=document.getElementById('signupform');


signupform.addEventListener('submit',signup);
async function signup(e){
      e.preventDefault();
    
      let userinfo={
        Name:e.target.Name.value,
        Email:e.target.Email.value,
       
        Password:e.target.Password.value,
        isAdmin:true
      }
      try{
     let response=await axios.post("http://localhost:3000/user/signup",userinfo)
       if(response.status===201){
        alert('succesfully created accout')
        window.location.href="./login.html"
       }

    
    }
     catch(err){
        console.log(err)
       
     }
}