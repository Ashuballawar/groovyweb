document.getElementById('bookform').addEventListener('submit',bookhotel)
const token=localStorage.getItem('token')
async function bookhotel(e){
    e.preventDefault()
    let id=localStorage.getItem('room')
    let hotelID=localStorage.getItem('hotelIDforroom')
let roominfo={
              roomID:id,
       
              hotelID:hotelID,
         startDate:e.target.start.value,
         endDate:e.target.end.value
}

let res=await axios.post("http://localhost:3000/user/bookroom",roominfo,{headers:{"Authorization":token}})
if(res.status==203){
    alert('booked')
}
}