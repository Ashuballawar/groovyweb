document.getElementById('bookform').addEventListener('submit',bookhotel)
const token=localStorage.getItem('token')
async function bookhotel(e){
    e.preventDefault()

    try{
    let id=localStorage.getItem('room')
    let hotelID=localStorage.getItem('hotelIDforroom')
let roominfo={
              roomID:id,
       
              hotelID:hotelID,
         startDate:e.target.start.value,
         endDate:e.target.end.value
}

let res=await axios.post("http://localhost:3000/user/bookroom",roominfo,{headers:{"Authorization":token}})
if(res.status==201){
    alert('booked')
}
    }
    catch(err){
        if(err.response.status==404){
            document.body.innerHTML+=`<h3>Rooms not available</h3>`
        }
        
        
    }
}