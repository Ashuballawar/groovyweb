loginform=document.getElementById('loginform')

loginform.addEventListener('submit',login)

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

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

        let ecryptedtoken=parseJwt(response.data.token)
        if(ecryptedtoken.isAdmin){

            window.location.href="./adminpage.html"
        }
        else{
        window.location.href="./homepage.html"}

        
        }
    
    }


        catch(err){
            document.body.innerHTML+=`<div style="color:red;">${err}</div>`
        }
    
    
    }
