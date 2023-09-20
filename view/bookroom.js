document.getElementById('bookform').addEventListener('submit',bookhotel)
const token=localStorage.getItem('token')
async function bookhotel(e){
    e.preventDefault()

    try{
    let id=localStorage.getItem('room')
    let hotelID=localStorage.getItem('hotelIDforroom')
    let price=localStorage.getItem('price')
let roominfo={
              roomID:id,
       
              hotelID:hotelID,
         startDate:e.target.start.value,
         endDate:e.target.end.value,
         price:price

}
console.log(roominfo)

let res=await axios.post("http://localhost:3000/user/bookroom",roominfo,{headers:{"Authorization":token}})
if(res.status==201){
    alert('booked')
}
    }
    catch(err){
        if(err.response.status==404){
            document.body.innerHTML+=`<h3>Rooms not available</h3>`
        }
        else if(err.response.status==400){
            document.body.innerHTML+=`<h3>Invalid Input</h3>`
        }
        
        
    }
}