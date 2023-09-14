loginform=document.getElementById('loginform')

loginform.addEventListener('submit',login)
async function login(e){
    e.preventDefault()
    User={Email:e.target.Email.value,
        Password:e.target.Password.value
        }
    
        try{
            console.log(User)
      response=await axios.post("http://localhost:3000/user/signin",User)
      if(response.status==201){
        alert('login successful')
        console.log(response.data.token)
      
        localStorage.setItem('token',response.data.token)
        window.location.href="./homepage.html"
        }
    
    }


        catch(err){
            document.body.innerHTML+=`<div style="color:red;">${err}</div>`
        }
    
    
    }
